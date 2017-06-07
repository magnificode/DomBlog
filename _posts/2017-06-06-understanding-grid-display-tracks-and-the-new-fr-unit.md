---
layout: post
title: Understanding Grid Display, Tracks And The New fr Unit.
---

Alright, so I'm going to be writing about the new snazzy CSS Grid property and all it's components. I'm going to try to do this in bite sized chunks so as to not write a blog post that encompasses all 18 new properties.

Let's get rollin.

### Display

There's three new values associated with the display property, `grid`, `inline-grid`, and `subgrid`. The first two are reminiscent of what we've seen in the past with flexbox. The `grid` value generates a block level grid element, and `inline-grid` does just what it says, generates an inline-level grid element. Subgrid however, will require a bit of an extended explanation.

#### Subgrid

The short and sweet definition for subgrid is best summarized by the [CSS-Tricks Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

> **subgrid** - if your grid container is itself a grid item (i.e. nested grids), you can use this property to indicate that you want the sizes of its rows/columns to be taken from its parent rather than specifying its own.

Unfortunately, as the CSS Grid Guru Rachel Andrew points out, [Subgrid moved to Level 2 of the CSS Grid specification](https://rachelandrew.co.uk/archives/2017/03/16/subgrid-moved-to-level-2-of-the-css-grid-specification/).

For examples sake, check out this CodePen demo below:

<p data-height="413" data-theme-id="21523" data-slug-hash="bRNGoz" data-default-tab="css,result" data-user="magnificode" data-embed-version="2" data-pen-title="bRNGoz" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/magnificode/pen/bRNGoz/">bRNGoz</a> by Dominic Magnifico (<a href="https://codepen.io/magnificode">@magnificode</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

What subgrid will effectively do is remove the need for us to define the `grid-template-columns` on each individual `.grid-item`. It will inherit the value that we provided to the `.grid` parent, thus keeping our code nice and slim. Until Grid Level 2 ships however, we'll have to use the method shown above.

Let's tackle the other two properties we see in this example, along with some of the syntax attached.

### grid-template-columns (and rows). AKA Tracks.

This is the bread and butter of CSS Grid. After we've told a container to be `display: grid;` we need to tell it how we want the grid items within it to behave. By applying `grid-template-columns` or `grid-template-rows` to the wrapper we can essentially define a template for how we want its children to behave. Here's a simple example:

```html
  <div class="grid">
    <div class="grid-item">Sweet Grid!</div>
    <div class="grid-item">Sweet Grid!</div>
    <div class="grid-item">Sweet Grid!</div>
  </div>
```

And the associated CSS.

```css
  .grid {
    display: grid;
    grid-template-columns: 300px 300px 300px;
  }
```

Each of the `300px` definitions in the CSS above, relates to one column. This format persists for any number of columns or rows (also called tracks in [CSS Grid-Speak](https://www.w3.org/TR/css-grid-1/#grid-track-concept)).

### Ugh, so much typing

I'm sure you're sitting at your computer thinking "Gee that's a lot of typing if you have a bunch of tracks."

![ugh](http://bukk.it/ugh.gif)

Boy howdy are you in luck. Within the `grid-template-columns` property we have a nifty function we can utilize called `repeat()`. As you likely saw in the CodePen example above, our grid wrapper had this declaration `grid-template-columns: repeat(3, 1fr);`. I bet you can figure out how to use this function. The first integer in the function represents how many times we'd like to repeat the following track sizing. The second parameter we pass to the function is the size. Which leads us to the next section, on the `fr` unit.

### Pretty `fr`ickin' cool huh?

It's late, this blog post is getting long, and I'm getting overzealous with the puns. Lets wrap this up eh? The last thing we'll talk about is the new `fr` unit. This unit allows us to define flexible lengths and represents a fraction of the free space within the grid container.

*One important thing to note* with the fr unit. Unlike, px, em, or percentages, the fr unit is not defined as a length. Which means it cannot be used in combination with px, em or percentages within something like the `calc()` function.

[The spec itself](https://www.w3.org/TR/css-grid-1/#fr-unit) spells out the calculations that are taking place to define the available free space. But what it boils down to in my head is this; Setting our `grid-template-column` track size to `1fr` gives us equally proportional grid items based on the width of the container.

We are able to use decimals in conjunction with the fr unit. In our example, if we change our value to say, `.5fr` nothing changes. This is because each of our three items should still remain proportional. Because there are three items to a track, unless we tell them to be less than `.33333fr`, they will remain proportional.

It's super difficult to talk about CSS grid in a general sense since there is **so much** in the spec. But hopefully this is bit-sized enough for you to digest. And honestly this blog post is as much for me as it is for you, dear reader. It should be fun to write some more of these posts as I stumble my way through the grid.

![the grid](https://media.giphy.com/media/oSYflamt3IEjm/giphy.gif)