---
layout: post
title: The Case for (or against) the CSS @supports rule
---

With the increasing support for the feature detection `@supports` CSS property, I figured it might be a cool idea to dive into this feature a little bit. While listening to [Episode 253](http://shoptalkshow.com/episodes/253-rapidfire-84/) of ShopTalk show, Mr. Chris Coyier mentioned possibly a GitHub repo or blog post that has some pre-baked use cases for the `@supports` property, and here we are!

Here's a quick little description about what the `@supports` property does; Essentially, `@supports` works just like a media query, but detects certain features, rather than viewport dimensions, media types, etc. A feature query more or less. Using `@supports` in [browsers that support it](http://caniuse.com/#feat=css-featurequeries) (Everything except for IE11 and lower at this point) gives us the ability to check wether or not a feature is supported in that particular browser. If it is, the subsequent CSS rules are enforced. If the browser does not support the property, it will just ignore the rule altogether, no harm, no foul.

The theory is that this would give us an opportunity to conditionally apply CSS based on browser support. A neat thought for sure, but in researching for this blog post, I had a hard time coming up with a solid set of recipes for the rule. Let's run through some of the basic scenarios that crossed my mind first.

## `@supports(display: flexbox)`

Alright, so a colleague of yours just sent you an awesome design. Nice grid layout. Time to **flex** your CSS muscles and use some flexbox. But oh no! The accounts team just informed you that you have to support IE9. Well shoot, let's play out how this scenario could go utilizing the `@supports` rule. Lets use the classic use case for flexbox; You have multiple things (`.thing`) with a heading and description inside. The description text length is variable, and you want to make sure all the `.thing`s are the same height, regardless of content length. Maybe something like this:

```scss

  .thing {
    border: 2px solid #efefef;
    margin: 10px;
    padding: 20px;

    // Fallback for IE9 if browser
    // doesn't support flexbox.
    float: left;
    width: calc(33.333333% - 20px);

    h2 {
      color: #2b2b2b;
    }

    .description {
      font-size: 1rem;
    }
  }

  // Insert fanciness here
  @supports (display: flexbox) {
    .thing-wrapper {
      align-items: stretch;
      display: flex;
      justify-content: center;
    }

    .thing {
      flex: 0 1 33.333333%;
    }
  }

```

Awesome! That looks like a solid use case for `@supports`. We've got a percentage width, and a float applied to the `.thing` as a fallback for if flexbox is not supported. 👍

However, to play devils advocate here, what's to stop us from just doing this:

```scss

  .thing-wrapper {
    align-items: stretch;
    display: flex;
    justify-content: center;
  }

  .thing {
    border: 2px solid #efefef;
    flex: 0 1 33.333333%;
    margin: 10px;
    padding: 20px;

    //IE9 support
    float: left;
    width: calc(33.333333% - 60px);

    h2 {
      color: #2b2b2b;
    }

    .description {
      font-size: 1rem;
    }
  }

```

The `.thing-wrapper` properties will be ignored, as IE9 doesn't recognize them, and the float and width properties will be ignored on newer browsers, as the `display: flex` property takes over. Now, organizationally, it might be nice to throw those properties that older browsers don't support into a nice block. But functionally, the benefit seems a bit limited.

## Hello Operators

Let's try another example. The `@support` rule also accepts a few additional operators: `not`, `and`, and `or`. You can chain these operators to get some fancy results. For example, you can tell tell the `@support` rule to fire when a browser does not support a CSS property.

Let's say we want to try out some awesome fancy CSS variables (not utilizing SCSS as my example above does). If the browser does not support CSS variables, then fire off some CSS to compensate.

```css

  @supports not (--color-1: #c0ffee) {
    .coffee {
      color: #c0ffee;
    }
  }

```

A basic example, but it gets the job done. What we're saying here is if the browser does _not_ support the use of CSS variables, apply the color directly to the coffee div. This sounds pretty good, but now we have to consider if the browsers this declaration will apply to, even support the `@supports` rule. If the browser does not support the `@supports` rule to begin with, this chunk of code will get skipped over, and our coffee div will not get the styling we defined within.

For this specific example, CSS variables [are not supported](http://caniuse.com/#feat=css-variables) in Edge v14. However the `@supports` rule is. Therefore, this chunk of code will work! Which is great, this definitely seems like a decent use case in this specific scenario.

## Additional Scenarios

To try to remain as unbiased as I could after these two original thoughts, I also ran through a few more scenarios that I won't go into as verbosely as I did in the two above.

I tried to find some benefit in the use of the rule for CSS keyframes, which ended with the same issues I had with our first flexbox example. I checked out the new `display: flow-root` property coming down the line (It's [a neat property](https://css-tricks.com/display-flow-root/) that replaces the long standing clearfix). This was a good case for the `not` operator, much like our CSS variable example. And lastly I checked out the use case for CSS 3D transforms. And much like our flexbox example, found the same issues.

## TL;DR

The bottom line here I think, is that the idea of the `@supports` rule was a fantastic one in the days of yore, when browser support for various CSS properties was a vast, convoluted mess. But today, browser vendors are beginning to support properties at roughly the same time. And even if they don't, it's not as if the same logic JavaScript follows, applies here. If a browser doesn't recognize a CSS property, it skips over it and moves on. There's no perceived performance benefit to utilizing the `@supports` rule as far as I can tell. There are certainly a few good cases to utilize `@supports` and the `not` operator. Especially for older versions of Edge that don't support things like CSS variables. However, to me, the `@supports` rule seems mostly cosmetic, and provides a clean way to organize CSS properties that your current project's browser requirements may not allow for you to utilize.