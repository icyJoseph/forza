# <a id="top"></a>Forza Football

Build as part of a coding challenge for Forza Football

## Content

1. [Demo](#demo)

2. [Running Locally](#local)

3. [Challenge](#challenge)

4. [Solution](#sold)

5. [UI](#ui)

6. [Assumptions](#assumptions)

## <a id="demo"></a>Demo

[top](#top)

A deployed version of the solution: [in this link](https://talented-reaction.surge.sh).

Details about the solution can be found in the [Solution](#sol) section below.

## <a id="local"></a>Running Locally

[top](#top)

1.  Clone the repository.

    ```
    git clone https://github.com/icyJoseph/forza.git
    ```

2.  Go into the repository.

    ```
    cd forza
    ```

3.  Install dependencies.

    ```
    yarn
    ```

    or

    ```
    npm install
    ```

4.  Build the App.

    ```
    yarn build
    ```

    or

    ```
    npm run build
    ```

5.  Serve the build.

    ```
    serve -s build
    ```

6.  Open `http://localhost:5000` in your browser.

Why not run locally as developer?

> The URL to fetch data is selected depending on the environment you are in.

> For development, it looks for http://localhost:3000/, while for production it looks for the given end point.

> It is better to go to the [Demo](#demo).

To change this behavior, go to `src/config.js` and change the url to:

```javascript
export const url = process.env.REACT_APP_SECRET;
```

## <a id="challenge"></a>Challenge

[top](#top)

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

## <a id="sol"></a>Solution

[top](#top)

The proposed solution is a React-Redux application.

### React Tree

The application layout is as follows at a container level:

```jsx
const App = () => (
  <Provider>
    <Routes>
      <TopMenu />
      <Landing />
      <League />
      <Prediction />
      <FloatingActionButtons />
    </Routes>
  </Provider>
);
```

#### TopMenu

Stateless component which renders a Material UI AppBar and the share, clear buttons when the user navigates inside a league.

When inside a league it also renders the name and country of the league as MainTitle.

#### Landing

Fetches leagues data and renders a card for each one of them.

#### League

Shows the user's predictions for a league. It also renders a card for each team or player in the league.

#### Prediction

A set of buttons that will attach to the card selected by the user. This is a singleton. In mobile view they attack to the Floating Action Buttons. It also includes label in the middle of the screen which indicates the current selection.

#### FloatingActionsButtons

Normally two buttons. Back and sort by goals.

In mobile view the Prediction container attaches to the Floating Action Buttons.

### Redux Store

Simple redux store with keys for predictions, all leagues and sorting status.

#### Middleware

1. The store uses two middlewares. One is to show Redux store activity in Chrome dev tools.

2. The other middleware copies the store to the local storage at every new action, with the updated state.

> This last middleware allows the user the refresh, the page and come back right where they left.

#### Store Structure

1. Predictions is an object where we store each league name and predictions as values.

2. All leagues is an object storing all leagueName as keys, and league data as values.

3. Sorting simply checks if the user has clicked the sorting button.

> This could have been a local state, but since we are caching the store state at every new action, we can in fact, also save the user sorting criteria.

## <a id="ui"></a>User Interaction

[top](#top)

Upon landing the leagues are fetched. The user can select one, which will navigate to `/leagueId`.

- There the user can click on the team cards or navigate to the players tab, where the cards are also clickable.

> For mobile view the buttons are either pinned to the bottom right, while for desktop these float on top of the card.

- The user selections are reflected on the top panel

> The user may clear all selections by clicking clear on the Top Menu.

- The user can sort by goals scored last season, clicking the ball icon.

- The user can go back to the league with the pinned back button at the bottom right.

## <a id="assumptions"></a>Asumptions

[top](#top)

All leagues is better an as object. Worldwide there might be thousands of leagues, each with only about 30 teams on average.

> Mapping, filtering or reducing over 1000+ items can result in bad UX. Selecting from an equally large object is better.

> Fetching such large number of leagues is also rather tedious. Instead we cache the response and add an expiration time of one hour.
