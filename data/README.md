# ByteSpace Course Data (50 entries)

Generated from the **ByteSpace Figma design** (file `26TBgRjmpuxudcErJsHUfy`)
to model the following pages: **Search Page**, **Course Details**, **Course Lessons**,
**Course Reviews**, **Creator Profile**.

## Files

- `data/courses.json` — the 50-course dataset (the deliverable).
- `scripts/generate-courses.mjs` — deterministic generator (`node scripts/generate-courses.mjs`).

## How the data maps to the design

| Design page                    | JSON fields used                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------- |
| **Search Page**                | `categories`, `courses[].title/category/level/rating/ratingCount/studentsCount/price/thumbnail/tags` (course cards, filter chips, pagination) |
| **Course Details**             | `courses[].description/whatYouWillLearn/requirements/curriculum/creator/reviews/rating/ratingCount/studentsCount/price/certificate/language` |
| **Course Lessons**             | `courses[].curriculum[].lessons[]` (sections → lessons, `durationMinutes`, `preview`, `order`, section `durationMinutes`) |
| **Course Reviews**             | `courses[].reviews[]` (`user/rating/date/title/comment/helpfulCount/verified`)     |
| **Creator Profile**            | `courses[].creator` (`name/title/bio/verified/stats` + every course by that creator) |

## Verified from the design

- Platform name **ByteSpace**; navigation **Home / Courses / Creators**
- Hero copy: *"Get Access to Hundreds Courses Available"*
  — *"Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses."*
- Search placeholder: **"Course, Topic, Creator"** with a **Search** button
- Creator names seen on the Figma board: *Rasedul Ridowan Islam*, *Jannatul Fardousi Ila*, *Arafa Veno*
- Design frame sizes: Home `1440×1024`, Course Details `1440×2717`

## Regenerating

```sh
node scripts/generate-courses.mjs
```

The generator uses a fixed seed, so output is stable. Edit the pools at the top of
the script (title templates, creators, categories, prices) and re-run.