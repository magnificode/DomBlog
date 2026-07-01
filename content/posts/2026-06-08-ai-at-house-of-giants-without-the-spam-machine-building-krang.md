---
layout: post
title: 'AI at House of Giants, Without the Spam Machine: Building Krang'
description: >
  Part 1 of the Krang build: the bounded Hermes workspace, House of Giants context, and transcript-to-Linear loop that made AI useful without turning it into a spam machine.
date: 2026-06-08 09:00:00
categories: [ai, founder-notes]
tags: [ai, house-of-giants, operations, krang]
featured: false
---

## Part 1: Building Krang

Series:

- Part 1: Building Krang
- [Part 2: Context Is Not Memory](/2026-06-18-ai-at-house-of-giants-context-is-not-memory/)

There's a lot of bullshit AI hype bros out there documenting their "$80k MRR AI-based business."

I think that's largely a facade, and most of it is gross.

I've been working to use AI around [House of Giants](https://houseofgiants.com/) in a sensible way that's not just offloading all the critical thinking to an agent.

I've used, or am currently using some combination of, [Claude](https://claude.ai/), [OpenAI](https://openai.com/), [opencode](https://opencode.ai/), [Pi](https://pi.dev/), [CodeRabbit](https://www.coderabbit.ai/), [T3](https://t3.gg/), and a bunch of other tools.

I want to document what I'm building here, by shouting it into the void as I build it. I'm a couple months into my current setup, so for a bit I'll just be outlining what I did to get where I am.

My initial goal was to build a second brain. Something to supplement me as I try to grow House of Giants.

I wanted the HoG brain to do these things initially:

- ingest client call transcripts
- reliably extract decisions / tasks and log them
- write [Linear](https://linear.app/) tickets
- help draft, or outline SOWs, proposals, and sales docs

This would work well for me for existing client calls, along with new clients, and would help save me a pretty good chunk of time.

We'll start there.

## The stack I decided to start with

The first version of this setup was [Hermes](https://hermes-agent.nousresearch.com/) running inside [Docker](https://www.docker.com/).

That was mostly a security / blast-radius decision. I wanted the agent in a bounded Linux environment where I could decide what it could see. If Hermes made a mess, I wanted that mess to happen inside the container, not somewhere random on my actual machine.

For the default model, I moved forward with GPT-5.5.

I had used Claude a lot, and I still use Claude for some things, but it has felt increasingly lobotomized for the kind of work I want Hermes doing. Too much hedging, too much refusal-shaped weirdness, too much “let me be careful” when what I actually need is a competent operator that can inspect the source, make a judgment, and write the artifact.

Anthropic also just has not been great to build around. I don't want the core of my operating setup depending on a model/provider that keeps feeling less useful for this type of work.

So the starting stack was basically:

- Hermes as the agent harness
- Docker as the bounded workspace
- GPT-5.5 as the default model
- mounted HoG docs and shared files
- local shell / file search / artifact writing
- other tools connected as the work justified it

That isn't meant to be a universal recommendation. It's just the setup I picked because I wanted something useful, inspectable, and a little harder to accidentally turn into a disaster.

## First I had to figure out where the thing was standing

The first useful thing I did wasn't very impressive.

I put Hermes inside a Docker container on my work machine because I wanted it to only have access to things I had explicitly given it access to. If it wiped its own root directory, cool, we start over.

I'm not sure what the AI bros think these days, but I wanted to make sure what I was building couldn't turn into Skynet.

The Docker setup for Hermes was pretty smooth. Much smoother than when I tried OpenClaw a bit ago. I basically followed the docs, added the `.env` variables I needed for whatever model I was using, and we were good to go.

The first thing I sent to Hermes was basically `whoami`.

Tell me who you are, where you're running, and what your filesystem looks like.

It checked the working directory, home directory, and the actual environment it was running in. That sounds boring, because it is. But it mattered because I needed to know what this thing could see before I asked it to touch anything that mattered.

After that I made a shared folder so I had an easy place to copy files in from my machine and an easy place for Hermes to write things I wanted to pull back out. I could still `scp` files from the container if I needed to, but this was more convenient.

That was the first version of Krang, basically.

A little brain in a container, with a bounded workspace, a way to read things, and a way to write things somewhere I could inspect.

## The harness mattered more than the model

The container itself wasn't really the important part. I don't like Docker much myself, and I don't think the lesson here is that everyone needs to go run their agent in a Docker container.

The useful part was the harness around Hermes.

It had a bounded place to work, but it also had access to enough real stuff to be useful. I dumped the House of Giants docs into the container, gave it a shared folder for artifacts, and let it use tools like file search and shell commands inside that workspace.

That changed the shape of the interaction pretty quickly.

Instead of asking a model for advice, I could ask Hermes to inspect a folder, read the docs, write a draft somewhere predictable, check its own work, and then keep some of that context around for the next chat.

The early setup was basically:

- mounted House of Giants docs
- a shared folder for moving files in and out
- file search
- shell access
- persistent session history
- persistent memory
- skills
- eventually cron, webhooks, and gateway stuff

The important distinction for me was that the model wasn't the whole system.

The context window mattered, obviously. But the surrounding toolchain mattered more than I expected. If the agent can't inspect real files, write artifacts somewhere I can find them, and verify what happened, it's mostly still a chat box.

This is the diagram version of that idea:

```text
╭────────────────────╮
│  MODEL             │
│  answers prompts   │
╰────────────────────╯

╭────────────────────╮
│  HARNESS           │
│  files • tools     │
│  memory • history  │
╰─────────┬──────────╯
          ▼
╭────────────────────╮
│  WORKSPACE         │
│  inspect / write   │
│  verify / reuse    │
╰────────────────────╯
```

## Then I gave it the House of Giants docs

The first real House of Giants task I gave Hermes was basically:

"Read the docs I mounted and tell me what House of Giants is."

I had put a bunch of our actual material in the shared workspace: positioning docs, ICP notes, pricing stuff, case-study material, our MSA, sales docs, internal notes, and a bunch of other things that made sense at the time.

Hermes searched the markdown files, read the docs, and synthesized the business back to me:

- what we sell
- who we sell to
- what work we avoid
- pricing / offer structure
- current proof
- pipeline / revenue context

The first useful output wasn't a workflow or a dashboard or anything like that. It was just its understanding of who House of Giants is.

That mattered because without the right context, Hermes kept drifting toward generic agency advice.

It would suggest things that were directionally fine, but not really us. Generic positioning. Generic sales motions. Generic "here are 12 ways to grow your agency" advice.

Once it understood the business a little better, the next prompts got a lot less stupid.

This is one of the places where I think people get AI usage wrong. They jump straight to automation, but the first useful step was orientation. Before I wanted Hermes doing anything, I wanted to know if it could understand what kind of business I was actually running.

## The first useful output was still too broad

When Hermes first summarized House of Giants, it did a decent job.

It identified the obvious stuff:

- product engineering studio
- who we sell to
- the HoG positioning we'd defined
- proposal / pipeline / outreach process opportunities

But the output was still too broad.

It wanted to help with way too much, way too quickly. Sales, positioning, pipeline, content, proposals, relationships, operations, growth. All of which were fine directions, but way too sprawling for what I needed.

Even with a giant context window, the problem wasn't just whether the model could hold a bunch of information.

The problem was whether it knew what job it was supposed to be doing.

So I had to steer it toward something more specific. I told it to act as an operator for House of Giants. Identify gaps in process, help us create documentation, and suggest improvements as we worked together.

That changed the framing a little bit.

I didn't want Hermes constantly trying to give advice. I also didn't want it solutioning every half-formed thought I put into a chat window. The useful role was closer to an operator: inspect the current state, understand the business context, help turn messy inputs into useful artifacts, and tell me when something actually needed a decision.

That sounds like a small distinction, but it changed a lot.

Assistant energy is very "here are some options."

Operator energy is more like "I checked the source, here's what changed, here's what I updated, and here's the one thing I need from you."

That's what I wanted.

## The first real connections were Fathom and Linear

Over the next several weeks I gave Hermes access to the systems I wanted connected:

- [Attio](https://attio.com/) for CRM
- [Fathom](https://www.fathom.ai/) for meeting transcripts
- Linear for tasks
- [Apollo](https://www.apollo.io/) / [Hunter](https://hunter.io/) / [Resend](https://resend.com/) for outbound
- docs, PDFs, and content for sales material
- relationship context for follow-ups

I'll get into more of that later, but the most immediately useful pieces were Fathom and Linear.

Once Hermes could find a Fathom recording, fetch the transcript, scan it for decisions, tasks, follow-ups, or whatever else mattered from a meeting, and then write to Linear or a decision log, the setup started to feel useful in a very practical way.

Not magical. Not autonomous. Just useful.

Client calls are full of stuff that matters later:

- someone made a decision
- someone changed their mind
- someone asked for a follow-up
- something became out of scope
- something became a ticket
- something needs to be confirmed in writing

I can catch a lot of that myself, obviously. But I'm also usually running the call, thinking about the product, thinking about the client, thinking about delivery, and thinking about what we should or shouldn't commit to.

The transcript gives me a raw source. Hermes gives me a first pass. I still review the output, but I'm not starting from a blank page or trying to remember every important sentence from a call three days later.

That was the first version of the loop I actually cared about:

```text
╭────────────────────╮
│  CLIENT CALL       │
│  messy context     │
╰─────────┬──────────╯
          ▼
╭────────────────────╮
│  TRANSCRIPT        │
│  raw source        │
╰─────────┬──────────╯
          ▼
╭────────────────────╮
│  HERMES PASS       │
│  decisions / tasks │
╰─────────┬──────────╯
          ▼
╭────────────────────╮
│  LINEAR / LOG      │
│  work I can review │
╰────────────────────╯
```

That workflow is still one of the most useful parts of my setup right now.

## What Part 1 actually got me

At this point I didn't have some grand autonomous business machine.

I had:

- a bounded place for the agent to work
- a shared folder for inputs and outputs
- House of Giants docs mounted where Hermes could read them
- file search and shell access
- persistent memory and session history
- enough business context to stop getting totally generic advice
- the beginning of a transcript → decisions/tasks → Linear/log workflow

That was enough to keep going.

The important thing wasn't that Hermes was suddenly running House of Giants. It wasn't.

The important thing was that I had moved from "AI chat tab that gives advice" to "bounded operator workspace that can inspect source material and produce artifacts I can actually review."

That's a much more boring sentence than the stuff people usually write about AI.

It's also much closer to how this became useful.

Part 2 is probably where the system started getting harder: what to remember, what not to remember, and why dumping every transcript and old doc into the context layer made things worse.
