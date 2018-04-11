Cryptocurrency stories are all over the news these days, and for the most part it’s the blind leading the blind. The market is so new that historical data is less than useful for judging cryptos, or at the very least it’s not as informative as trends on other investment vehicles.

Coin Cafeteria is all about “sitting with the popular coins,” in the sense that sheer volume of news coverage can combine with sentiment analysis to help users discover which cryptos are worth researching.

The premise is: in such a speculative market, current reputation can serve as a driving force behind coin values.

Coin Cafeteria keeps track of 100 of the most popular coins on the market. On the back-end, a custom Ruby on Rails API fetches a coin’s most recent news mentions, then runs the stories through IBM Watson’s Natural Language Understanding API to analyze sentiment.

The front-end runs on React, with a customized build of Semantic UI. When a user clicks on a coin for more info, Coin Cafeteria shows the latest stats, news, and an indication of whether the coin’s current press is positive or negative, based on the average of Watson’s analysis.

This project was created using React/Javascript in the front end and Ruby on Rails in the back end.

To start, you need to either create a user or login as a current user.

Once logged in, you will see a list of cryptocurrencies.

You can sort these currencies by either name, price, or percent change.

You can search for a coin by the name as well.

You can add coins or remove coins from your favorites.

You can click the Show More Info tab to see news articles and more information about a certain coin.
