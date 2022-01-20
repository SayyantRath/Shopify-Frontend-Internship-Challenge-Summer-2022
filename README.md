# Front End Developer Intern Challenge - Summer 2022 #

Original Challenge Information: https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit#heading=h.31w9woubunro

The gist of the prompt: Create a website (Spacestagram) that pulls images from a NASA API, displays them, and allows users to interact (like/ unlike) them. Basic image data should be displayed as well.

#

## My Implementation ##

Deployed Website: https://sayyantrath.github.io/Shopify-Frontend-Internship-Challenge-Summer-2022/

**Framework used:** React

**APIs used:** NASA Images API, Prodigi API

<br />

**Basic Features Implemented:**
- Pulls images from the NASA Images API
- Displays picture, description, date, a like button, and a button to toggle more actions (explained later)
- Users can like & unlike pictures

**Extra Features Implemented:**
- Infinite Scrolling
- Search interface so users can query for certain pictures
- Animated like button
- Users can toggle between the search feed and a "liked" feed which displays a user's liked images 
- Saving likes to localStorage so that they persist even after the user leaves Spacestagram
- "Loading" state
- Users can download the picture (located under the more actions button across from the like button)
- Users can order a printed copy of the picture (using the Prodigi API) _Please note that to prevent any accidental actual purchases, the API endpoint I have called is Prodigi's sandbox endpoint_

<br />

# Pointers about the website: #

1) When you load in, you are greeted by a feed of posts. You can search for certain queries (try "stars") and the feed will show the search results. Clicking on an image will display an expanded view on the right where you can read the descriptive data, like/ unlike, download and/or order prints of the picture. Use the home and heart buttons on the rightmost bar to navigate between the feed view and the "liked" view.
2) Sometimes, a query may not load and if you check the console, you may see a CORS 403 error. After doing some digging, I learned that this usually means that traffic is too high to that endpoint and so you simply should just have to reload the page and try again shortly. I do not believe there is much I can do regarding this type of situation from the client side so I apologize for the patchy fix. (However if there is, I would love to know!) 

# Why I chose this UI/ UX: #

I chose this UI with the user's primary purpose for the website in mind- browsing through and finding interesting images. As such, I thought it would be cumbersome on the user to have to scroll through a larger feed like Instagram's where the descriptive data along with image actions are also shown. I opted to go for a feed where only the picture is displayed so the user can quickly scroll through and select and learn more about the pictures which interest them. I added the print and download functionality to give my website some meaning past what functionality the user could get from the NASA Image gallery. Ultimately with this UI, I was prioritizing utility, aesthetics and efficiency for the user.

<br />

**Features I would like to implement**

- Better loading state (perhaps a skeleton loading grid)
- Advanced Search Options
- Better Image Sizing UI when the user is ordering a print
