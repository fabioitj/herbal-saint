# Herbal Saint: botanical scroll direction

Research checked on 6 September 2026. These references informed composition and motion; their artwork, copy, and code are not reused.

## References

| Reference | Verified pattern | Herbal Saint interpretation |
| --- | --- | --- |
| [Olymp](https://www.konstolymp.gr/) | The [creator's case study](https://www.pointblank.gr/en/blog/case-study-award-winning-website-konstantopoulos-sa-olymp) documents olive and leaf parallax, brown/gold/green colors, grain, and fixed indicators beside the production story. | Make plants the visual subject; use forest green, warm paper, amber, and slow depth changes. |
| [Moooi Paper Play](https://www.moooi.com/paper-play) | The live experience has an entrance and a scroll invitation. The [designers' interview](https://www.webbyawards.com/crafted-with-code/moooi-paper-play/) describes a vertical storyboard, paper textures, product-led chapters, and GSAP scene timelines. | Structure scrolling as a sequence of botanical scenes, with the product maintaining visual continuity. |
| [Ohh! Potato](https://www.ohhpotato.com/) | [The development team's case study](https://7span.com/work/ohh-potato) describes layered visuals that explain product-making as the visitor scrolls, with adapted mobile animations. | Connect garden, preparation, and daily ritual through a clear narrative and simplify movement on small screens. |
| [Saigon Baigur](https://saigonbaigur.com/) | The retrieved brand page presents named botanical specimens, provenance, craft, and serving rituals. | Give ingredients recognizable identities and short sensory descriptions; connect the botanical story to practical product discovery. |

## Art and motion direction

The concept is a botanical atelier: sunlit leaves, tactile paper, dark green ink, amber glass, and generous editorial typography. Imagery should feel cultivated and physical. Oversized type and quieter captions establish a rhythm between expansive moments and close observations.

Motion should explain the journey: gently reveal the opening composition, introduce ingredients, move through the craft, and arrive at the collection. Prefer a few coordinated transformations over many continuously drifting objects. Olymp's designers specifically describe removing independent floating motion after it looked insect-like.

Keep navigation and collection access available during the story. Respect reduced-motion preferences and compose each mobile scene to fit its viewport. Treat the references as principles, not templates to duplicate.

The final interaction follows the user's central direction: scrolling should not feel like moving down a page. One sticky stage holds all chapters. Native scroll acts as a timeline for horizontal scene movement, a zoom into the garden, and stationary product transformations. Navigation links map to timeline positions and preserve browser history. Reduced-motion preferences and JavaScript-free rendering retain a conventional readable page.

## Verification limits

Primary brand pages and first-party creator descriptions were inspected through web retrieval. Moooi's live page returned its scroll invitation; its detailed animation mechanics are documented by its creators. Olymp's current homepage responded successfully. Ohh! Potato's homepage returned a retrieval error, so its scroll mechanics are attributed to its creator's case study; an official events page was reachable. Saigon Baigur is a botanical content reference, not a claim of verified scroll animation. The external experiences were not individually exercised in a graphical browser.

Firecrawl CLI was checked but was not authenticated; research used the available web browsing tool as a fallback.
