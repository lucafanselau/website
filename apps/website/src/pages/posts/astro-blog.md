---
title: Trying the Astro Framework to sandbox a portfolio / blog website
layout: ../../layouts/Blog.astro
description:
tags: ["Astro", "Frontend", "Blog"]
---

# Trying the Astro Framework to sandbox a portfolio / blog website

## Here we go again

Nowadays many ideas in the mind of the programmer require at least one kind of website technology. So there I am again, thinking about the ✨stack✨. So we want to have something new, since doing the same thing over and over again is hardly any fun and since i have written a lot of react throughout the last years, something new had to be found. Looking at the current state of web development, although there is WASM and the idea that a few years down the road, we evantually don't have to deal with the various quirks of javascript anymore, but for now, the developer experience and productivity seems to be fairly low and espacially if you have to do a lot of back and forth between the standard Web-APIs and the WASM runtime, the performance benefits get smaller and smaller. Don't get me wrong, I am incredibly hyped to try out libraries like [yew]() and alike. But time to market is a thing and sometimes getting things done is more important than how they are done.

## So we are back in javascript world again

So lets look at the javascript side of the ecosystem. Lately I have been seeing "solid.js" a lot and the premises of it intrigued me. Writing code that more or less looks like react, but is smart enough to figure out the dependencies of data by itself and enable true "reactivity". With react it always bothered me that you get the initial impression that you can use the function body of the react component to do what you want, but as soon as you have data that is changing somewhat rapidly the whole construct that you have build, quickly just breaks down on you and then your shitty drag and drop application feels sluggish and not like the snappy web experience that modern users have come accustomed to. So you basically have to options, writing naive code and then rewriting the stuff that causes problems or you just learn to useMemo all the stuff and start adding boilerplate in places were you are just trying to reroute a user. Personally I always feel like rewriting is bad for my productivity, so I typically resort to being overcautious using `useEffect` and its descendants. So I wanted to try that, espacially since the "cool kids on the block" nowadays use UI frameworks with a compile step, as also seen in svelte and others.

But than again the page that you are reading right know, is mostly static and we want websites to be snappy nowadays. Static site generation (SSG) typically is the solution for that, but the tooling can be quite cumbersome and it gets pretty hairy once you do want some client side code and dont necessarily want to start write vanilla js, or (subjectively) even worse jQuery. And thats when I found [astro.build]() which sets out to solve all of that and be compatible with all of common UI frameworks, through something that they call "Partial Hydration".

## So what is this astro

In case you didn't click the link in the previous paragraph in pure excitement and you stayed with me, lets look at was astro has to over.
