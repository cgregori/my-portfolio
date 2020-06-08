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

/**
 * Adds a random greeting to the page.
 */
function randomJojoQuote() {
  const jojoQuotes =
      ['If there\'s no Mickey, this ain\'t Disney', 'Do you believe in Gravity?', 'This is a test...', 'Wouldn\'t you agree, Jean Pierre Polnareff?', 
      'This... is.... Requiem', 'What a beautiful Duwang... Chew', 'Oh? You\'re approaching me?', 'OH NOOOOOO', 'YES YES YES', 'Awaken my masters!'];

  // Pick a random greeting.
  const jojoQuote = jojoQuotes[Math.floor(Math.random() * jojoQuotes.length)];

  // Add it to the page.
  const jojoContainer = document.getElementById('jojo-container');
  jojoContainer.innerText = jojoQuote;
}

async function helloName() {
  console.log('Hello World');
  fetch('/data').then(response => response.json()).then((names) => {
    document.getElementById('display-name').innerText = names;
  });
}

/** Fetches comments from the server and adds them to the DOM. */
async function loadComments() {
  let maxComments = parseMaxComments();
  let url = '/data?maxComments=' + maxComments;
  fetch(url).then(response => response.json()).then((comments) => {
    const commentsListElement = document.getElementById('comments-list');
    comments.forEach((comment) => {
      commentsListElement.appendChild(createCommentElement(comment));
    })
  });
}

function parseMaxComments() {
  let currentUrl = getURL();
  let parser = new URL(currentUrl); 
  let queryString = parser.search;
  let pos = queryString.search("maxComments=");
  let maxComments
  if(pos != -1) {
    //Add "maxComments=".length (12) to position
     maxComments = queryString.slice(pos+12);
  } else {
    //Default value of maxComments
    maxComments = 10;
  }
  return maxComments
}

/** Creates an <li> element containing text. */
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.content;

  const upvoteButtonElement = document.createElement('button');
  upvoteButtonElement.innerText = 'Upvote';
  upvoteButtonElement.addEventListener('click', () => {
      //TODO(cgregori): Add upvote functionality
      console.log('This should upvote the comment');
  })

  commentElement.appendChild(titleElement);
  
  return commentElement;
}

/** Tells the server to upvote a comment */
function upvoteComment(comment) {
  //TODO(cgregori): Add upvote functionality
}

function getURL() {
  return String(window.location.href);
}