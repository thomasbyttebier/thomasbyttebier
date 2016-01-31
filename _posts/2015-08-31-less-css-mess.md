---
layout: post
title:  Less CSS mess
date:   2015-08-31
permalink: /blog/:title
code-highlight: true
---

For years I’ve struggled with CSS. Remember (link: https://revisionlab.wordpress.com/that-squiggle-of-the-design-process/ text: Damien Newman's squiggle) as a visual representation of the design process? Flip it and you'll have a perfect depiction of any CSS project:

(image: css-project.png)

At least in my case, every new project starts out extremely well-organized, then pretty soon turns into (file: giphy-fail.gif text: a complete mess). The problem is mostly me, but I blame CSS for it as well.

CSS is an unstructured language. Everything can be accomplished in twenty-five different ways. (And if you’re part of a team: everything will be accomplished in twenty-five different ways.) The biggest problem is arguably CSS’s biggest selling point: there’s a quick fix for every problem. Just put a new rule at the end, upping the selector’s specificity a bit.

But as features get added, team members chime in and functionality changes, the CSS will soon be a huge mess full of conflicts, syntax diversity, repeated code and specificity problems. Maintaining the CSS turns into a nightmare. The code gets bigger and more complex with each change. Days-old CSS looks scary already.

There must be a better way.

Well, actually, there is. As often, I found a solution in restriction. Using much of the killer coding philosophies of CSS wizard [Harry Roberts](http://csswizardry.com), I found a way that’s helped me keep the CSS for the web app I’m currently working on manageable, understandable and above all: highly reusable. And as the app keeps evolving, the CSS doesn’t get more complex. At most it only gets bigger, but that's ok.

There's basically 5 things that helped me shape up the way I code my designs enormously: coding guidelines, itcss, namespaced CSS, BEM and documentation in a front-end style guide. Let me go over each of them briefly in the next paragraphs.

## Coding guidelines

The first thing I found very helpful is pretty basic, but important: coding guidelines. The goal here is to have your CSS appear as if it was written by one single person, even if it's a team effort. On a low level, it’s about indentation and global formatting. On a higher level it’s about class naming conventions, documentation (as code comments) and architectural principles. This is the base of everything that follows. As a consequence, everyone that ever touches your CSS codebase must follow these coding guidelines.

If you’re writing CSS for a few years already, chances are you’re following some kind of personal (perhaps undocumented) coding guidelines. It’s the coding style that feels right to you. If you haven’t yet, now might be a good time to write these out in cold rules. If not for this project and team, they’ll be extremely helpful in the next. Additionally, writing these down makes you think them over again. I found [Nicolas Gallagher](http://nicolasgallagher.com)'s [Idiomatic CSS principles](https://github.com/necolas/idiomatic-css) and [Harry Roberts](http://csswizardry.com)’s [CSS guidelines](http://cssguidelin.es) an excellent starting point.

## Itcss

The second step is figuring out a more general architectural principle for your CSS. This is where [itcss](http://itcss.io) comes in for me, a methodology I once again learned from Harry Roberts. Itcss, not unlike [Smacss](http://smacss.com), basically adds structure. The beauty of itcss is that there’s never going to be a quick and dirty fix placed at the end of a CSS file anymore. Itcss just doesn’t allow it. CSS needs restriction, and itcss helps with that.

Itcss’s main purpose is to never have trouble with inheritance or the cascade again, as it's mostly these inherent CSS principles that easily lead to smelly code. The idea is simple yet effective: write CSS in specificity order. Start with generic, far-reaching styles and end with very specific localized styles. Itcss groups styles with equal specificity into so-called layers. Let me go over each of the itcss layers concisely, just to give you an idea.

The first itcss layer is called the *generic layer*. It's things like (link: https://necolas.github.io/normalize.css/ text: normalize) or (link: http://www.paulirish.com/2012/box-sizing-border-box-ftw/ text: box-sizing rules). They affect as good as every element on a page, but have very low specificity. It’s best to thematically organize them in separate files, having the itcss layer clearly readable in the filenames, say *generic.normalize.css*, *generic.box-sizing.css* and so on. It's the first files that get included on your pages.

Next, add files for your base styles: unclassed element selectors. This is itcss’s *base layer*. You’ll end up with files such as *base.forms.css*, *base.links.css*, *base.lists.css* and *base.typography.css*. After this itcss layer, you’ll never run into an element selector again: it’s all class selectors from now on, naturally overwriting earlier generic or base CSS rules if necessary.

The next itcss layer is the *objects layer*. If you know about [OOCSS](https://github.com/stubbornella/oocss/wiki), objects will sound familiar. Harry Roberts calls them cosmetic-free design patterns. [Nicole Sullivan](http://www.stubbornella.org/) speaks of "repeating visual patterns that can be abstracted into an independent snippet of HTML, CSS and possibly JavaScript. The object can then be re-used throughout a web site."

In the project I’m currently working on, the objects layer is mainly the grid system. Objects are the workhorses of your web site. I use my grid object in every area of the site. For maximum reusability, it's important that an object has absolutely no 'design' added to it, and just does its thing. The cool thing about objects is that they can be recycled in other projects as well.

We’re definitely not done yet with the itcss layers, but you may start to see a pattern: the generic layer targets almost all parts of the dom. The base layer is pretty far-reaching as well as it targets every element of a certain kind. Objects on the other hand don’t affect anything unless you add these object classes to your elements. Each layer is therefor more specific, and targets less dom parts. This makes sure specificity issues are a thing of the past. Visually this could be represented as an inverted triangle, hence the name itcss: inverted triangle css.

(image: itcss-triangle.png alt: inverted triangle css)

Back to itcss layers. As seen in the image above, next up are *components*. A component is a  reusable chunk of UI that is clearly designed, as opposed to an object. Its name gets more explicit and clearly refers to a block of UI: pagination, buttons, modals, icons… When well-written, you can take a component and paste it everywhere in your site. It’ll work and look good.

The final layer of itcss is what Harry Roberts calls trumps. Other CSS methodologies may call them utilities, helpers or overrides and for some reason I started to call them *wins*. There’s going to be a lot of `!important` statements in here and that’s ok as you want these to win over whatever you declared before. It’s things like `.u-size-1-of-2`, `.u-text-right` or `.u-visually-hidden` that basically do one thing and you add to one element at a time. (They may scare you at first because they’re only one step away from inline CSS, but every project just needs at least some of these.) Put these wins together in thematically ordered files such as *wins.show-hide.css*, *wins.alignment.css* or *wins.widths.css*.

As for me, itcss has proven to be great. Each CSS rule has a clear place in the itcss hierarchy. Team members know where to look for CSS rules and above all: they know where to put new rules. Our codebase will never get more complicated than itcss itself, it can only get bigger. Every filename clearly indicates what itcss layer it’s part of. When written well, it doesn’t matter what order the files are loaded in on the page, as long as you have the generic layer files first, followed by the base layer files, the object files and so on, all the way to the wins.

If itcss sounds interesting to you, make sure to check out [this talk](https://www.youtube.com/watch?v=1OKZOV-iLj4) Harry Roberts gave on itcss. He’s way better suited to explain it all to you. ([His slides are here.](https://speakerdeck.com/dafed/managing-css-projects-with-itcss))

(youtube: https://www.youtube.com/watch?v=1OKZOV-iLj4)

## Namespaced CSS

Your CSS will now appear well-written and organized. But it gets better. If you namespace your CSS, the classes in your HTML will indicate the itcss layer they reside in. That makes your HTML a lot more readable, as everyone in the project will clearly see where a class comes from, just by looking at a piece of HTML. Classes that live in itcss’s objects layer get prepended with o-. Think of `.o-grid` and `.o-scrollable`. Component classes are namespaced with c-. I have classes like `.c-icon`, `.c-form-control` and `.c-btn`. Wins are prefixed with u- (or w- if that makes more sense). Also, any possible JavaScript is tied to classes prefixed with js-.

Again, this whole idea comes from Harry Roberts. [Here's his take on namespacing CSS classes.](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

## BEM

There's a lot to learn from looking at a piece of HTML now. And it will still get better if you use the BEM naming methodology. BEM – an acronym for block, element, modifier – is a front-end naming methodology. It is a simple way of naming CSS classes to give them more meaning to other developers.

BEM's naming convention follows this pattern:

- `.block {}`
- `.block__element {}`
- `.block--modifier {}`

`.block` represents an object or component, a piece of code that stands on its own and can be dropped anywhere on the page. Think of `.dropdown` for instance (or even better: `c-dropdown`).
`.block__element` represents a descendant of `.block`. Think of `.c-dropdown__link`, `.c-dropdown__button` or `.c-dropdown__menu` for instance.
`.block--modifier` represents a different state or version of `.block`. Think of `.c-dropdown--checkmarks` for what could be a version of a dropdown that allows for checkmarks to be placed next to the dropdown's menu items. Another example could be `.c-dropdown--large` for a larger version of the dropdown. It's both small variations on the base block.

Using BEM, your HTML is now communicating more than ever to whoever is reading it. Just by looking at a piece of HTML, you can see how everything is related. An element may be the start of a component, its classes might suggest it's a part of a block, or it might be a variant on a component.

As an example, consider the following piece of HTML:

{% prism html %}
<div class="o-grid">
  <div class="o-grid__cell u-size-1-of-2">
    <div class="c-dropdown c-dropdown--large js-toggle-colors">(...)</div>
  </div>
</div>
{% endprism %}

    <div class="o-grid">
      <div class="o-grid__cell u-size-1-of-2">
        <div class="c-dropdown c-dropdown--large js-toggle-colors">(...)</div>
      </div>
    </div>

We can learn a lot from the HTML alone:

- The outer `div` sets up a grid. I can find the grid CSS rules in the objects layer, most likely in the file objects.grid.css.
- The next `div` is a descendant of the grid object. It doesn't make sense on its own. Its CSS rules are in the same CSS file: objects.grid.css. There's a sizing utility from the itcss wins layer added to it (making it half the width of its parent).
- The inner `div` is a dropdown component. I can find the CSS rules in the itcss components layer, most likely in the file components.dropdowns.css.
- The next class clearly shows we're displaying a modifier of the dropdown component, namely a large variant.
- There's JavaScript tied to the dropdown component. It's ok to manipulate all classes but the js- one. That would break JavaScript functionality.

Isn't this great? Code is suddenly readable and conveys a lot of meaning to anyone in the project. Lovely!

## Documentation as a front-end style guide

The final step is documenting the chunks of UI in a style guide.  As a freelancer, in a lot of projects it's my job to make myself superfluous as quickly as possible. A style guide fits this scenario perfectly. It's an inventory of UI elements, briefly documented for developers. It's a place where you tell them when and how to use each of the various components you've designed. (link: http://primercss.io text: Primer) is a good example, or even the (link: http://getbootstrap.com/components/ text: Bootstrap documentation).

Style guides are living documents, they're never done. As soon as a bit of UI changes, the style guide has to reflect that change. If it doesn't, it's become useless. As a result, documenting UI in the style guide has grown to be a part of my daily workflow. As soon as I finished refactoring CSS or writing new CSS rules, I turn to the style guide to document what I have done.

Another nice thing about style guides is that they once again force you to think about your code and your design. I find this often results in additional small changes to the code base to improve UI consistency. Listing all dropdown variants on a page makes it very clear why they exist and when to use what variant. In my case, this frequently results in removing one or two superfluous variants. A consistent UI is a better UI.

Admittedly, it sure takes a while to set up and maintain a style guide. I've learned it takes some convincing to get everyone on the team on board as well. But it pays off when developers start to build their own pages using the correct variants of the UI components you've documented.

I have only used itcss, BEM and namespaced CSS for a couple of months now, but it’s definitely better than anything I’ve tried before. I'm excited.
