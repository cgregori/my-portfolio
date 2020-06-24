// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

public final class FindMeetingQuery {
  
  public static final int END_OF_DAY = 1440;
  private ArrayList<TimeRange> conflicts = new ArrayList<>();
  
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    ArrayList<TimeRange> meetingTimes = new ArrayList<>();
    
    // If the request is longer than a day, return an empty time range.
    if(request.getDuration() > END_OF_DAY) {
      return conflicts;
    }

    // Find conflicts for all the required attendees.
    findConflicts(events, request);

    // If there are no conflicts, the whole day is open.
    if(conflicts.isEmpty()) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    // Sort the conflicts.
    Collections.sort(conflicts, TimeRange.ORDER_BY_START);

    // Combine the conflicts if there's no room for breaks between them.
    ArrayList<TimeRange> combinedConflicts = combineConflicts();

    // Sort the collection one more time
    Collections.sort(combinedConflicts, TimeRange.ORDER_BY_START);

    meetingTimes = findMeetingTimes(combinedConflicts, request);

    // To catch a snafu with an END_OF_DAY bug
    for(int i = 0 ; i < meetingTimes.size(); i++) {
      if(meetingTimes.get(i).start() == END_OF_DAY) {
        meetingTimes = new ArrayList<TimeRange>();
      }
    }

    return meetingTimes;
  }

  private void findConflicts(Collection<Event> events, MeetingRequest request) {
    for(Event event : events) {
      for(String attendee : request.getAttendees()){
        if(event.getAttendees().contains(attendee)) {
          conflicts.add(event.getWhen());
        }
      }
    }
  }

  private ArrayList<TimeRange> combineConflicts() {
    ArrayList<TimeRange> combinedConflicts = new ArrayList<>(); 
    if(conflicts.size() == 1) {
      combinedConflicts.add(conflicts.get(0));
    } else {
      for(int i = 1; i < conflicts.size(); i++) {
        TimeRange currentTimeRange = (TimeRange)conflicts.get(i);
        TimeRange previousTimeRange = (TimeRange)conflicts.get(i-1);

        // Let's check & see if two conflicts overlap with each other
        if (currentTimeRange.overlaps(previousTimeRange)) {
          // If the two events are nested, get the larger event, else, combine the conflicts.
          if(currentTimeRange.contains(previousTimeRange)) {
            combinedConflicts.add(currentTimeRange);
          } else if (previousTimeRange.contains(currentTimeRange)) {
            combinedConflicts.add(previousTimeRange);
          } else {
            TimeRange combinedTimeRange = TimeRange.fromStartEnd(
              previousTimeRange.start(), currentTimeRange.end(), false);
            combinedConflicts.add(combinedTimeRange);
          }
          continue;
        }

        combinedConflicts.add(currentTimeRange);
        // On our first run through let's add the previousTimeRange if it isn't overlapped or nested.
        // This can also add the first event.
        if(i == 1) {
          combinedConflicts.add(previousTimeRange);
        }
      }
    }
    return combinedConflicts;
  }

  private ArrayList<TimeRange> findMeetingTimes(ArrayList<TimeRange> combinedConflicts, MeetingRequest request) {
    ArrayList<TimeRange> meetingTimes = new ArrayList<>();
    // If the first conflict isn't at START_OF_DAY, we can add our first timeslot.
    if(combinedConflicts.get(0).start() != TimeRange.START_OF_DAY) {
      meetingTimes.add(TimeRange.fromStartEnd(
        TimeRange.START_OF_DAY, combinedConflicts.get(0).start(), false));
    }
    // Remove conflict timeslots from meetingTimes
    for(int i = 1; i < combinedConflicts.size(); i++){
      meetingTimes.add(TimeRange.fromStartEnd(
        combinedConflicts.get(i - 1).end(), combinedConflicts.get(i).start(), false));
    }
    // If the last conflict doesn't end at END_OF_DAY, we can add the final timeslot
    if(combinedConflicts.get(combinedConflicts.size() - 1).end() != TimeRange.END_OF_DAY) {
      meetingTimes.add(TimeRange.fromStartEnd(
        combinedConflicts.get(combinedConflicts.size() - 1).end(), TimeRange.END_OF_DAY, true));
    }

    // Now we check to make sure each TimeRange in meeting slot is long enough
    for(int i = 0; i < meetingTimes.size(); i++) {
      if(meetingTimes.get(i).duration() < request.getDuration()) {
        meetingTimes.remove(i);
      }
    }
    return meetingTimes;
  }

}
