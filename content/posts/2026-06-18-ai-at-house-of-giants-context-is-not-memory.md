---
layout: post
title: 'AI at House of Giants, Without the Spam Machine: Context Is Not Memory'
description: >
  Part 2 of the Krang build: why giving an AI operator more context made the system worse until House of Giants got stricter about memory, source material, and review.
date: 2026-06-18 09:00:00
categories: [ai, founder-notes]
tags: [ai, house-of-giants, operations, krang]
featured: false
---

## Part 2: Context Is Not Memory

Series:

- [Part 1: Building Krang](/2026-06-08-ai-at-house-of-giants-without-the-spam-machine-building-krang/)
- Part 2: Context Is Not Memory

Part 1 got me to the first version of Krang that felt useful enough to keep going.

It was still simple. Same [Hermes](https://hermes-agent.nousresearch.com/) harness, same bounded workspace, but pointed at House of Giants work and slowly getting shaped into the role I actually needed. It could search the files I gave it, read through House of Giants context, remember a few stable things between sessions, and start helping with the transcript to Linear loop.

So, naturally, I started doing the dangerous thing you do when a system starts working.

I gave it more stuff.

More docs, more old strategy files, more proposal patterns, more reviewed source excerpts, more random bits from the old House of Giants / OpenClaw archive. That archive was big. 900+ files big. Past project artifacts, sales docs, specs, internal notes, half-built agent ideas, playbooks, proposal patterns, and a bunch of old architecture thinking that felt very important when it was written and much less obviously important when I looked at it later.

The very AI-brained thing to do would have been to shove all of it into the system and call that memory. I almost went that direction, because it feels productive. You have a folder full of old work, the agent can search it, and the dumb little voice in your head starts going, hell yeah, company brain.

But the more I looked at it, the more obvious it became that I was about to create a search box for a junk drawer.

## The archive was a mess

The first thing I asked Krang to do with the old archive was basically an audit. I wasn't asking it to memorize the folder. I wanted it to read through the mess and tell me what should come forward into the current House of Giants operating setup.

The first pass was useful, but way too generous. This is usually how these systems behave. Give an agent a folder full of old docs and it will find patterns everywhere. Some of those patterns are real. Some are just old docs standing up straight because the headings make them look important.

That was the part that made me nervous. Krang could find useful things in the archive, but it didn't automatically know what was still true, what was only source material, what was old mythology, and what was just a plan that looked complete because it had a lot of sections.

A transcript can sound like a decision if you are sloppy about it. An old proposal can sound like current scope if the wording is confident enough. A 900-file archive can sound like a company brain if the model is good at summarizing. None of that means the thing should be trusted.

Some of the archive was genuinely worth keeping. There were discovery docs with a shape I still liked. There were proposal skeletons that had good bones. There were technical summaries and PRD-ish artifacts that looked like the kind of work House of Giants should keep producing. That stuff mattered because it showed how messy client context could become a thing someone could actually read and use. The agent architecture around it was mostly noise.

There was also a lot of stuff that needed to stay buried. Old positioning experiments. Old operating system mythology. Old ideas about agents that were more interesting than useful. Plans that sounded official because they had titles like phases and modules and operating surfaces, but didn't map to how I run the business now.

So I changed the ask. I had Krang classify the archive instead of summarizing it. Stuff that was actually reusable, stuff that was stale, stuff that should stay source-only, stuff that could maybe become a template someday, and stuff that absolutely shouldn't get promoted into memory just because it sounded official.

That was one of the first times I trusted Krang more when it was throwing stuff away than when it was making something new.

The output I wanted wasn't a beautiful summary. It was a sorting pile. Keep this artifact pattern. Ignore this stale strategy. This one can become a template. This one is source-only. Don't promote this into active memory.

If I let all of that old material become memory, I wasn't making Krang smarter. I was making a junk drawer with a search box.

## Krang had to know what kind of thing it was reading

The scary part wasn't that Krang couldn't find things. It could find plenty of things. The scary part was that it found everything with the same calm little model voice, and that can make old, half-true material feel much more current than it actually is.

The first architecture that mattered here wasn't really technical architecture. It was realizing that [Fathom](https://www.fathom.ai/), [Linear](https://linear.app/), [Attio](https://attio.com/), the House of Giants docs, and my working notes were all allowed to mean different things.

Fathom holds meeting source material. Linear holds execution. Attio holds account and relationship state. The House of Giants docs hold polished positioning, offers, sales material, and public-facing artifacts. The working notes became the boring middle where I could put decision logs, project notes, source links, templates, review piles, and context that had been cleaned up enough that I wouldn't hate myself for reusing it later.

That doesn't mean all of those systems get melted down into one big AI soup. It means each system keeps its job. Krang can go look at the thing I point it at when there is an actual reason to look.

```text
+------------+   +----------------------+   +-----------------------+
| raw source |   | working layer        |   | durable system        |
+------------+   +----------------------+   +-----------------------+
| Fathom     |-->| excerpts/candidates  |-->| decision log          |
| Linear     |-->| task references      |-->| execution             |
| Attio      |-->| account context      |-->| relationship state    |
| HoG docs   |-->| working notes        |-->| public/sales material |
+------------+   +----------------------+   +-----------------------+
                         ^
                         |
                 Krang can inspect.
                 Krang doesn't own truth.
```

This was boring, but it mattered. I didn't want the agent to behave like every paragraph it found had the same authority. A raw transcript tells me what someone said. A decision log tells me what we agreed to. A Linear issue tells me what someone needs to do. A proposal tells me what we offered. A public page tells me what I am comfortable saying out loud.

If Krang can't tell the difference, it becomes dangerous in a very boring way. Not Skynet dangerous. More like quietly creating three slightly different versions of the truth that I have to untangle later, which is somehow worse because at least Skynet has the decency to be obvious about ruining your day.

This is the AI risk I actually care about most of the time. The admin sludge version.

## Memory started feeling a little too convenient

Hermes has persistent memory, which is great. But that doesn't mean every business fact deserves to live there forever like it earned a little retirement home in the model.

Memory made sense for stuff that would probably still be true next week. How I want Krang to behave. What kind of tone House of Giants uses. What not to call something. Which tools or paths matter in this setup. Conventions I don't want to repeat every session.

It didn't make sense for every client decision, every scope change, every prospect note, every half-written idea, or every project detail. That stuff needs a source, a date, and a place I can go look at without wondering which version of reality the agent decided to keep.

Early on I was too casual with “remember this.” It worked fine for tone preferences or path conventions. It was dumb for client scope, because scope changes aren't vibes. They need to be traceable. They need to sit somewhere I can inspect later when everyone is tired and nobody remembers why we agreed to the thing we agreed to.

A stable preference can go in memory. A client decision probably belongs in a decision log. A task belongs in Linear. A project detail belongs in project context. A half-formed thought can stay a half-formed thought until it earns a better home.

That was a small but pretty important change in how I used the system. I stopped saying “remember this” so casually and started asking where the thing actually belonged.

Sometimes that place is memory. A lot of the time, it isn't.

## The middle layer was deliberately plain

So we ended up with a pretty simple middle layer.

And by simple I mean deliberately plain.

Mostly markdown.

At this point it was just a folder of files I could read, edit, search, and hand to Krang without pretending the folder was some magical company brain.

Folders for project notes, decisions, templates, source links, case-study capture, operating notes, and whatever else I knew I would need to inspect later when something inevitably got weird.

I know that sounds underwhelming. That was the appeal.

There are a million versions of this idea right now. AI brain filesystems, Obsidian vault systems, project memory frameworks, naming schemes, graph-y knowledge bases, whatever. Everyone thinks their folder structure is the one that finally makes the machine useful.

I don't really buy that.

Most of the time it's all just text files the AI can parse. Your folder structure isn't spiritually better than mine. Mine isn't spiritually better than yours. If the files are readable, named sanely enough, and close to the work, the model is going to pull them into context anyway.

So I built the structure that made sense for the documents I was actually giving Krang, and I stuck with that for now. I do like [Vercel's Eve structure](https://vercel.com/blog/introducing-eve). It makes sense to me. I just haven't moved this setup to it yet.

Markdown is boring, diffable, searchable, and easy for me to read. Krang can inspect it. I can inspect it. It can be committed to a repo. It doesn't require me to trust some opaque layer that claims to “know” the business, which is usually where the trouble starts.

Markdown wasn't magic. The move that helped was getting stricter about what got copied forward.

Raw source stays in the source system. When there is a specific job, Krang can do a pass over the relevant source. The pieces that actually matter get moved into a place I can inspect and reuse.

That was a lot better than pretending the agent could remember everything correctly forever. The problem was never that Krang might forget a random old paragraph. The problem was that it might drag some old, half-true paragraph into new work with confidence.

## Fathom didn't need to become markdown

This became especially obvious with meeting transcripts.

In Part 1 I talked about Fathom and Linear being the first loop that felt genuinely useful. When I use that workflow, the raw client call transcript stays in Fathom. Krang works from that specific source to propose decisions, tasks, follow-ups, scope changes, and things I shouldn't forget. Then I review the output and decide what actually moves into Linear or a decision log.

The tempting thing would be to save everything. Full transcript, summary, tasks, decisions, follow-up, all of it. That feels safe for about five seconds because you can tell yourself you are keeping the context. But really you are just creating another pile you will have to clean up when you are already tired.

If I dump every transcript into the working context layer, those notes become a worse version of Fathom. I don't need that. Fathom already exists. The transcript can stay there.

Krang's job is to help me pull out the pieces that should affect future work: decision candidates, action items, open questions, scope changes, risks, follow-up obligations, short source excerpts when they are useful, and links back to the original system instead of copied raw material.

The list is boring because the work is boring. Most useful systems are boring if you describe them honestly.

I don't need an AI system to hoard everything like a raccoon with a SaaS budget. I need it to help me move the right things into the right place.

The raw source can stay where it belongs. The working layer only needs the parts I am going to care about later.

## Decision candidates were safer than decisions

The meeting workflow got better when I stopped asking Krang to extract “decisions” and started asking for decision candidates.

That wording matters, even if it sounds annoyingly precise.

Client calls are messy. I might be thinking out loud. The client might be thinking out loud. Someone might say something confidently that is really just a preference. Something might sound like scope but actually be a question. Something might be a real decision, but only if you include the constraint that came five minutes earlier.

The scary thing wasn't that Krang would make something up. The scary thing was that it could take a real sentence from a real call and promote it into the wrong kind of truth.

So the prompt changed from “extract decisions from this transcript” to something more annoying and more useful: extract decision candidates, cite the transcript, explain what would need to change if we accept this, tell me where it belongs, and don't write it into the project log until I approve it.

After that change, I still had to review the output, but I was reviewing something with a source and a proposed destination. I was no longer starting from a blank page, and Krang was no longer quietly promoting raw conversation into project truth.

This is the part I keep coming back to with this whole setup. The agent should reduce the amount of junk in my head. It shouldn't create a new pile of junk I have to audit later.

## Client communication is where this can get weird fast

The same rule matters even more with client communication.

This is the part where the AI version of the story can start to sound creepy if you say it wrong. Or worse, if you build it wrong.

I don't want some agent free-climbing through a client inbox looking for “opportunities” or whatever dead-eyed phrase someone would put in a slide deck. Gross, and also not useful.

Most of the time, the version I actually want is way smaller.

If I am writing a follow-up, I might pull in the one thread that matters. Maybe the last call notes too. Enough to check what we promised, what they asked for, whether I already said I would send something, and whether there is some decision sitting five messages back that I am about to accidentally contradict.

Basically, that is the job.

Not “go learn everything this client has ever said.” Not “turn email into company memory.” Not “let the robot reply while I go make a sandwich.”

There's a lot of normal human stuff buried in client communication. Half-formed thoughts. Private constraints. Budget weirdness. Partner context. The kind of thing people say because they trust you are a person on the other side of the thread and not a vacuum cleaner with a prompt window attached to it.

So the rule is pretty simple: the inbox stays the inbox.

Krang can help me with a specific thing I am already doing. It can look at the specific source I choose. It can help draft, check, summarize, or remind me that I promised to send the thing I definitely would have forgotten to send.

But it doesn't get to wander. It doesn't get to treat client email like training material. It doesn't get to send replies on its own. And anything client-facing still goes through me, because my name is the one on the email.

I'm not being precious about it. The whole point of the system is to help me keep better track of the trust that already exists, not replace trust with automation.

A useful system doesn't need to see everything all the time. It needs enough context to do the current job without turning the whole business into a junk drawer with a send button.

## The system got smaller

The funny thing is that Part 2 of this build was mostly subtractive.

The dumb version of this kind of system gets bigger and bigger. More context. More tools. More memory. More integrations. More automations. More places for the agent to stick its little robot hands.

That sounds powerful, but power wasn't really the bottleneck. I had enough access. What I didn't have yet was a way to trust the access.

I needed to trust that when Krang used something, it knew what kind of thing it was using. A raw transcript, a draft, a decision, a task, current positioning, a stale idea, a client commitment, an internal note. If those all get flattened into “context,” the next output gets worse and I have to clean it up.

Without those labels, everything starts to blur together and the agent becomes another thing I have to manage. With them, the system got less annoying.

I still have to review it, especially before anything goes to a client or becomes one of those facts the business starts building on top of. But it stopped turning every old paragraph into homework.

Part 1 was getting Krang into a bounded workspace where it could inspect real material and produce artifacts I could review. Part 2 was learning that access isn't intelligence, and memory isn't the same thing as a big pile of text.

The next problem was routing. After a meeting, what becomes a task, what becomes a decision candidate, what becomes a follow-up, what becomes project context, and what should just stay in the transcript?

This is where the whole thing started to feel less like “chat with better files” and more like an actual operating layer.
