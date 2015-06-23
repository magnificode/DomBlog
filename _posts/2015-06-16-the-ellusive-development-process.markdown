---
layout: post
title:  "The Ellusive Development Process"
date:   2015-06-16 15:51:00
categories: update
---
In my previous posts I discussed [how to start setting up processes within your team](http://dommagnifi.co/update/2015/05/14/spinning-up-process.html)and [the integration of that process to the whole team](http://dommagnifi.co/update/2015/06/01/the-importance-of-company-wide-respect-for-process.html). Feel free to check those posts out as well. This post however is the all about the ellusive development process. Which really is  [not](http://vincentp.me/blog/my-front-end-development-process-start-to-finish/) [that](http://blog.chartbeat.com/2014/01/30/modern-front-end-workflow-start-finish/) [ellusive](https://www.codeschool.com/blog/2014/11/14/front-end-process/) [at](http://code.tutsplus.com/tutorials/essential-tools-for-a-modern-front-end-development-workflow--pre-66083) [all](http://bradfrost.com/blog/post/development-is-design/). All of these articles are fantastic by the way, and give insight into the front end development process. What follows is the adaptation I have taken from my few years in the industry. It is by no means comprehensive or perfect. As I mentioned previously no process is perfect, and any good process is iterated upon and constantly changing, so do not take this post as gospel, use it, improve it, and tell me all about it. Next to front end development, front end development process is a passion of mine as well.

#The Zenman Development Process

So I’ve been with Zenman for almost three years now, and I can tell you first hand that our process has grown and evolved tremendously over those three years. Back in the day we were getting printed out documents that had our schedules for the week on them, we weren’t using much of a client management tool, and our development processes were pretty much developer specific. Now don’t get me wrong, there was a method to this, and it worked pretty damn well for the company at the time. But of course, it needed to evolve.

#The Tools

Of course there is no one set of tools that is perfect. Much like your processes, it’s a long journey of trial and error before you find that sweet spot. I’m going to go over the tools that we use and how they fit into our process.

##Project Management

As much as we all loved the printer paper schedule, it was very hard for us to be able to keep track of all the individual items that needed to be done for each of our projects. That’s where [basecamp](http://www.basecamp.com) comes in.

Basecamp gives us the ability to add projects. Within these projects we can add specific to-do’s with due dates, and assign them to people. In addition we also gain the ability to have active discussions with the client, something that has proved to be quite valuable for us since we are always working with the client in regards to their design. Basecamp has a ton of features, and if you don’t have a project management solution it’s definitely worth checking out.

Now within basecamp we have a specific structure for to-dos, we have a bunch of pre-defined templates that outline everything from our approval process from clients, to items that need to happen in order for us to consider a site launch successful. We have many many process oriented lists in basecamp that help to streamline our jobs, and these are all specific to Zenman, over the years we have established things that work, and things that do not. Not only for us, but for our clients. These to-do lists, and basecamp documents are incredibly helpful for us to stay on track and for us to keep a running paper trail of all communications with clients. We have protocol that forces us to ensure that everything is documented in basecamp to ensure clear, transparent communications with the client. This way, nobody is out of the loop, and anyone can jump into a project and be informed to tackle any issue or request.

##Agile Development

There are a few tools out there that help to aid shops in staying agile. All of them center around stories, and an acceptance process with the Product Owner.[Pivotal Tracker](http://www.pivotaltracker.com) is our tool of choice for our agile projects. This gives us a much more granular view of exactly what prices need to be built into a website.

We start by adding a project. Within this project we import a library of stories that are true for any responsive website. We’ve set up a public instance of an example project [here](https://www.pivotaltracker.com/n/projects/914224). I’ll let that project do most of the explaining, but the main takeaway here is that this gives us a very granular and trackable view of how a project is going. One of our steps in the development of a site is for us to go over the functionality, and all the layouts, and input a tracker story for each feature. This gives us a high level view of the anticipated length of the project, and allows us to see exactly what we can expect to get done that week for that project.

A bit of a side note here, we consider a full ‘day’ to be six hours. There are company wide meetings, and a blocked out period first thing in the morning for developers to tackle small issues that can be resolved quickly. We do these things from 8-9 in the morning so that directly afterwords we can jump right in to the big stuff, and sty focused on it for the whole day.

Each story is assigned a point value, or a level of effort, and based off of that we set a velocity which then anticipates the amount of stories or points that we can complete each week.

##CMS

Every client that we work with needs to be able to update their content, or utilize a blogging platform. We use [Wordpress](http://www.wordpress.org) for that. Most of the sites that we develop are Wordpress sites, and we have some processes that go along with that.

**Starter Theme**

If you google “Wordpress Starter Theme” you’ll get a million results...Bones, Genesis, _S, Starkers etc. I’ve used a few of these, and Zenman started out with starkers, however a lot of these come with some bloat that we don’t necessarily need. So like all good developers, we built our own tool for the job. [Zemplate](https://github.com/zenman/zemplate). Very minimal, with a sprinkle of mixins, functions, and ideologies that we at Zenman find very useful.

Our template utilizes BEM for class naming structure, which helps to keep things clean and easy to understand regardless of the developer that looks at the project. We implemented a galactic version of Brad Frost’s [Atomic Design System](http://bradfrost.com/blog/post/atomic-web-design/) to help keep things modular. We not only modularize our SASS, but we also modularize our template parts, and javascript. Pretty much everything is modular.

**ACF**

We found that keeping things modular allows us to build bits and pieces separate from everything else so that they can work anywhere on the site. We utilize a plugin called [Advanced Custom Fields](http://www.advancedcustomfields.com/). Within advanced custom fields is a piece called Flexible Content. By default Wordpress only has one text area for clients to manage content, and that didn’t work for us. Our layouts are complex enough that it is imperative for clients to be able to edit content throughout the site. ACF and flexible content allow us to do this. Because we build all our components modularly, we are able to build a call to action section once, and then utilize it anywhere on the site. The client has the ability in the backend to add this piece to any page and have it work every single time. This is huge, and if you use Wordpress I would highly highly recommend using ACF.


##Local Development

This one’s pretty easy, and there isn’t much process involved with this. We use [MAMP](https://www.mamp.info/en/) to develop locally. This gives you the ability to spin up a server locally and run a Wordpress site on your machine. The only real standardization that we have here is our database naming structure. We have our local databases, prefixed with `l1_`, we then utilize git and push to our git server which then pushes out to our development `d1_`, testing `t1_` and staging `s1_` servers.

This utilizes some git hook sorcery that I will not pretend to be privy to. But it’s awesome, and my co-worker [Tomas Mulder](http://www.codepen.io/tcmulder) is a git sorcerer. Ask him about it, and it’ll go right over your head.

##Version Control

Every development team needs some sort of version control to prevent catastrophic overwrites and terrible terrible headaches. Something I’ve definitely never experienced...

[Git](https://git-scm.com/) is what we use for that. As I mentioned, I’m not the most  versed in the land of git, but we have a few very slick git hooks that will push up the databases in addition to the files whenever we make a change. And depending on the branch you are on locally, it will push up to the correct server (dev, test or stage).

The one thing that we do make sure to do process-wise, is write clean, well thought out commit messages.

##Reviews and Testing

Once a developer has completed the development of the project to the best of his or her knowledge we have a few steps to take before we send the project to the client.

**Browser Testing**

The developer will go in on their own and browser test their site in our supported browsers (The latest version and two prior major versions of Firefox, Chrome, Safari and Internet Explorer). Once all the bugs are fixed the site moves into Code Audit.

**Code Audit**

The developer and a Senior Developer will then sit down and go over the code at a high level. This step is crucial to ensure a consistency in the way that our code is written. We’ve found that when working with multiple developers it is crucial to ensure the code can be traversed by any developer at the company. We ensure things are modular, that the BEM class naming structure has been adhered to. We test the site speed and make sure that the site does not choke on slower connections or is unreasonably slow. Is the code commented in places where it makes sense (i.e complex javascript or PHP. Including usage examples). Are you using `!importants`? I’m pretty well known at Zenman for making developers write out explanations when an `!important` is used...I’m very specific about specificity.

These meetings are great because the Senior Dev gets to see the progression of the other developers at the company, but also gets to help shape the quality of code that the company produces. Every single one of these that I have done has yielded a learning experience on both ends of the table. If you can afford one more step in your process, add a Code Audit. It’ll dramatically change the code quality your company produces.

**QA**

This step gets a fresh set of eyes on the project. This new person will scour the site on all browsers again, and make note of any discrepancies between design and production.

**QC**

Once QA is complete, one of the folks from the business side of things will ensure that contractually, everything has been addressed and delivered. We again test this in all browsers to make sure we didn’t miss a single thing.

**Alpha**

Finally the site makes it to the client. We give them a chance to review the site, and provide one round of feedback. It’s important for us to ensure that the client at least has one iteration of back and forth in regards to their site. This also gives us the opportunity to defend some design decisions, and explain to the client exactly why we chose to utilize specific functionality.

**Staging and Launch**

This is the most process intensive step and varies drastically depending on your companies set up. But this is our chance as developers to check, check again, check one more time, freak out because we have a ‘feeling’ that we missed something, realize we didn’t, close our eyes, and then hit the button.

Here’s a list of items we ensure happen on every stage and launch that we do.

- Ensure it is before 2:00 MST.
- Back up live code and database to Zenman servers.
- Identify in changelog that the site is being staged.
- Begin staging preparation locally on the `stage` branch.
- Confirm Google Analytics code is added (may not start tracking until the site is live).
- Confirm site uses compressed JavaScript files.
- Confirm style.css is compressed.
- Empty the WordPress page trash and posts trash.
- [initial launch] Add new admin user for client and add credentials to client_info.rtf.
- Push stage branch to gitlab.
- Confirm 444 permissions for .htaccess/wp-config. !important
- Delete project code and databases from dev and test servers
- Confirm Site works with and without www.
- Verify Google Analytics is rendering on live site.
- Confirm that it's possible to log into the WordPress backend.
- Verify sitemap URLs use the live site's address.
- Backup new code and database in client folder on zenmass.
- Remove the outdated site's directory and delete it's database (but leave it's user).
- Identify in the changelog that the launch is complete.
- [initial launch] Ask project manager to schedule a retro.

And that, ladies and gentlemen, is where I'm going to end the worlds longest development process blog post. If you stuck with me this far, congratulations here's a gif to reward you.

![alt text](http://bukk.it/annodomini.gif)

This series of posts will be turned into a talk that I'll be doing at Refresh Denver on August 12th. [Check it out and RSVP if you're interested!](http://www.meetup.com/refreshdenver/events/219844847/)