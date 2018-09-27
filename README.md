# Forza Football

Build as part of a coding challenge for Forza Football

## Challenge

The new football season brings with it a sense of excitement among fans as everything
starts again. At this time of year many fans enjoy making predictions about how the
season will go, who will win and who will be top scorer?
In this test, we would like to see how you create a small mobile first web app where the
user can predict the top 3 teams in the upcoming Premier League season. They will
select who they think we finish 1st, 2nd and 3rd. Additionally it would be great if they
could also select who they think will be top scorer. Once they have made their
prediction they should then see a summary of their selections.

Feel free to experiment with the UI solution. How can you use the provided data and
present it? How will the user interact and make their predictions? We are mostly looking
at functionality, but presentation is also important.
Ideally your solution will be written in plain javascript however if you are more
comfortable in React or other framework then that would be fine as well.
Note:​ Remember that this is just a small project to get something for us to discuss about coding
together, you don’t need to spend days on this. If you find stuff that you would like to improve in
your solution after sending it to us, write it down and bring your own feedback to the
presentation.

## Solution

The proposed solution is a React-Redux application.

### React Tree

The application layout is as follows at a container level:

```jsx
<Provider>
  <Routes>
    <TopMenu />
    <Landing />
    <League />
    <Podium />
    <Prediction />
    <FloatingActionButtons />
  </Routes>
</Provider>
```

#### TopMenu

Stateless component which renders a Material UI AppBar and the share, clear buttons when the user navigates inside a league.

### Redux Store

### User Interaction

### Asumptions

### Purpose
