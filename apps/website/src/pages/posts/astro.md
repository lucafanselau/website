---
title: Trying the Astro Framework to sandbox a portfolio / blog website
layout: ../../layouts/Blog.astro
description: Building a new thing always creates an opportunity for testing new technologies. Follow me as we look into Astro a new SSG framework for snappy websites with a twist.
tags: ["Astro", "Frontend", "Blog"]
---

# Trying the Astro Framework to sandbox a portfolio / blog website

## Here we go again

Nowadays many ideas in the mind of the programmer require at least one kind of website technology. So there I am again, thinking about the ✨stack✨. So we want to have something new, since doing the same thing over and over again is hardly any fun and since i have written a lot of react throughout the last years, something new had to be found. Looking at the current state of web development, although there is WASM and the idea that a few years down the road, we evantually don't have to deal with the various quirks of javascript anymore, but for now, the developer experience and productivity seems to be fairly low and espacially if you have to do a lot of back and forth between the standard Web-APIs and the WASM runtime, the performance benefits get smaller and smaller. Don't get me wrong, I am incredibly hyped to try out libraries like yew and alike. But time to market is a thing and sometimes getting things done is more important than how they are done.

## So we are back in javascript world again

So lets look at the javascript side of the ecosystem. Lately I have been seeing "solid.js" a lot and the premises of it intrigued me. Writing code that more or less looks like react, but is smart enough to figure out the dependencies of data by itself and enable true "reactivity". With react it always bothered me that you get the initial impression that you can use the function body of the react component to do whatever you want, but as soon as you have data that is changing somewhat rapidly the whole construct that you have build, quickly just breaks down on you and then your shitty drag and drop application feels sluggish and not like the snappy web experience that modern users have come accustomed to. So you basically have two options, writing naive code and then rewriting the stuff that causes problems or you just learn to useMemo all the stuff and start adding boilerplate in places were you are just trying to reroute a user. Personally I always feel like rewriting is bad for my productivity, so I typically resort to being overcautious using `useEffect` and its descendants.

But than again the page that you are reading right know, is mostly static and we want websites to be snappy nowadays. Static site generation (SSG) typically is the solution for that, but the tooling can be quite cumbersome and it gets pretty hairy once you do want some client side code and dont necessarily want to start write vanilla js, or (subjectively) even worse jQuery. And thats when I found [astro.build]() which sets out to solve all of that and be compatible with all of common UI frameworks, through something that they call "Partial Hydration".

## So what is this astro thingy

In case you didn't click the link in the previous paragraph in pure excitement and you stayed with me, lets look at was astro has to over. Astro falls into the category of static site generators, but they addressed the issue that you typically encounter with SSG, that you always have at least some amount of dynamic content on the web page. This is were typically developers would typically use a framework, such as react, svelte, vue, etc., which makes writing client side logic extremely easy. But those frameworks impose a client side overhead when loading your webpage, either rendering or hydrating the page, which for generally highly static data, like blog or documentation pages, seems unnecessary. The approach that astro chose to this problem is writing most of your pages in a static, jsx-like, templating language, that has the added benefit that you can import and use a component of any framework. Lets look at a simple `index.astro` page, you might encounter: (ps. to bootstrap a project have a look [here](https://docs.astro.build/en/getting-started/)). Please also note that this is not aimed to be a full on tutorial on how to get started in astro, since that is already covered to a great extend by the website.

```astro
---
// Hey this is normal js/ts code
const a = 0;
// with top level await 👍 and access to `fetch`
const response = await fetch("https://random-data-api.com/api/color/random_color");
const body = await response.json();
const color = body.hex_value;
---

<html>
    <head>
        <title>My Homepage</title>
    </head>
    <body>
        <h1>Welcome to my website! Current color is {color}</h1>
    </body>
</html>

<style define:vars={{ color }}>
    body {
        background: var(--color);
    }
</style>
```

The first thing that becomes apparent is that every page needs to return a complete html page. We will later see how this can be abstracted away though. At the beginning of the file we have the `---` delimiters that contain the _Component Script_, here you can execute "arbitrary" javascript that will be executed during **build** time. None of that code will be bundled and send to the client, so you can use that to safely access APIs and other stuff you might do server-side. You will need to keep in mind though that everything you do in `.astro` files will never reach the client and will only be executed once during the build step. (_although_ there is a server side rendering (ssr) integration that will execute every time a page is requested, similar to `getServerSideProps` in `next.js`. You can find out more about that [here](https://docs.astro.build/en/guides/server-side-rendering/)). In the example above, we are making a request to the random-data-api, which will return us a random color. Using the quite powerful `<style>` tag we can then convert the javascript variable into a css-variable and use it to style our page. Now everytime the page gets _rebuilt_ (that is a new version is build), we get a page with a different color. Of course we could have also fetched our own api or database and display data we retrieve from there. Similar to classical jsx we can also use the declared js variables in the html template, as we have done with the color string in the `h1` text.

## Astro components

Rewriting the same complete html document every time is not very feasible though, we can therefore use [Components](https://docs.astro.build/en/core-concepts/astro-components/) to abstract that once and reload in every page. They have the same layout as the pages and can also execute arbitrary javascript at build time. You would probably typically use that to have reusable parts of your project defined once and not many times. An example of that can be found in the source code of this website, which can be found [here](https://github.com/lucafanselau/website).

## Integrations

But now we get to the really interesting stuff that astro has to offer. The *Integrations*🎉. These can range from simple ones like adding [tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/) to the project or adding SSR adapters. Although SSR is currently no requirement for my project I won't cover those in detail here, but you can certainly hit me up if that interests you. Basically Integrations are just an easy method of hooking in the the _vite_ powered build system that astro uses behind the scenes. The real star of the show though are the UI Framework Integrations. There is an integration for basically every UI framework you could want. I will write another blog posts covering one use case that I had for the Dark/Light Mode Switch, so check that out if that is of interest to you.

## Conclusion and thoughts

Generally I was quite pleased with the DX that astro had to offer. And of course the 99 Performance score that I get with Lighthouse on this exact page is extremely promising. Mixing multiple UI Frameworks is an extremely nice feature and generally for something like a portfolio website I would strongly consider astro. Please note however that astro is still a WIP library. Actually as I wrote this article I got a random runtime error from the astro compiler. Therefore I would not recommend using this framework for mission critical code. On the flip side however, when **not** using the SSR integration, astro builds into static html and can thus not cause runtime issues on the client side.

In the following few blog articles I will cover the more advanced stuff that you can do with the Island model and different UI Frameworks. If I remeber I will add those here, if you are reading this though I probably forgot though 😅.
