The Quiz game is a multiplayer game where 1 player creates a question with answers while others need to answer correctly.
The player has the option to play as a guest without the need to sign up for an account.


Structure:

Intro view: Option to play either as a guest or login/sign up.
Party/Game creation view: Party lobby as a host where you can invite people and already create a quiz.
Profile view: Edit profile picture, status and show player stats such as victories and high scores.
Quiz view: See one question at a time. After answering swap the current answered question view to the next pending one.
End game view: Dialog with the final score and option to play again.


Game logic:

The host creates the quiz. 
The host has the option to edit and delete questions and answers during creation of the quiz.
The player who answers correctly gains 10 points.
The player with the highest score wins.
A question must have minimum 2 answers.
There can be multiple correct answers.
Answer questions one at a time and see how many correct answers are present. When an answer is clicked, see immediately if it was correct(green background) or wrong(red background). If wrong show which one was the correct by highlighting the answer's background with the color green.


Guides that helped create the game:

Guide on Express:
https://www.youtube.com/watch?v=SccSCuHhOw0&ab_channel=WebDevSimplified

Guide on user authentication:
https://medium.com/@nile.bits/the-ultimate-guide-to-implementing-authentication-in-javascript-applications-bb4e13ef905d

Guide to MongoDB Atlas:
https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
