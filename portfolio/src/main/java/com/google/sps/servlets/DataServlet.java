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

package com.google.sps.servlets;

import java.io.IOException;
import com.google.gson.Gson;
import java.util.ArrayList;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.data.Comment;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  int maxComments;

  @Override
  public void init() {
    maxComments = 10;
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    //For body onload="loadComments()"
    getMaxComments(request);
    List<Comment> comments = loadComments(maxComments);

    Gson gson = new Gson();

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(comments));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    //Logic for receiving maxComments from form
    getMaxComments(request);
    if(maxComments != -1) {
      List<Comment> comments = loadComments(maxComments);
      Gson gson = new Gson();
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(comments));
      String redirectUrl = "/index.html?maxComments=" + maxComments;
      response.sendRedirect(redirectUrl);
    }
  }

  private String convertToJson(List<String> strings) {
    Gson gson = new Gson();
    String json = gson.toJson(strings);
    return json;
  }

  private void getMaxComments(HttpServletRequest request) {
    //Convert the max input to a string
    String maxCommentsString = request.getParameter("maxComments");
    if(maxCommentsString != null) {    
      try {
        maxComments = Integer.parseInt(maxCommentsString);
        return;
      } catch (NumberFormatException e) {
        System.err.println("Could not convert to int: " + maxCommentsString);
      }
    }
    maxComments = -1;
  }

  private List<Comment> loadComments(int maxComments) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Comment").addSort("comment");
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(maxComments));

    List<Comment> comments = new ArrayList<>();
    for(Entity entity : results) {
      long id = entity.getKey().getId();
      String commentContent = (String) entity.getProperty("comment");
      String imageUrl = (String) entity.getProperty("imageUrl");

      Comment comment = new Comment(id, commentContent, imageUrl);
      comments.add(comment);
    }
    return comments;
  }

}
