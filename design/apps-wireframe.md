# Apps Wireframe — Sat Apps Marketplace

## 1. Purpose

The Apps screen is the marketplace browsing page.

It should help users:
- browse all available apps
- search quickly
- filter by category
- sort results
- save apps for later
- open app details easily

This screen should feel like a premium catalog, not a plain product list.

---

## 2. Main Goal

The Apps screen should make discovery easy.

Users should be able to:
1. understand the page instantly
2. search by name/category/use case
3. filter and sort products
4. compare apps visually
5. move to AppDetails fast
6. contact for custom requirements if needed

---

## 3. Screen Flow Order

Top to bottom:

1. top bar
2. hero intro block
3. custom app banner
4. search input
5. category filter chips
6. sort chips
7. stats row
8. section header
9. apps card carousel/list
10. pagination dots
11. lower info blocks
12. common footer

---

## 4. Section-by-Section Wireframe

## A. Top Bar

### Content
- back button
- page title: `Apps Marketplace`
- subtitle: `Explore all products`
- compact right action: `Contact`

### Purpose
- page identity
- easy back navigation
- quick contact access

---

## B. Hero Intro Block

### Content
- eyebrow: `ALL PRODUCTS`
- hero title
- short subtitle

### Purpose
- introduce catalog page
- keep premium brand tone
- orient the user

---

## C. Custom App Banner

### Content
- title: `Need a custom app?`
- short supporting line
- CTA: `Contact Us`

### Purpose
- capture users who do not find an exact listed app
- keep lead generation visible

---

## D. Search Input

### Content
- input placeholder:
  `Search apps, categories, solutions...`

### Purpose
- quick filtering
- support browsing and discovery

### Notes
- should feel premium and large enough
- search field should not look too technical

---

## E. Category Filter Chips

### Content
- `All`
- dynamic categories from data

### Purpose
- fast browsing by category

### Notes
- horizontal scroll allowed
- active chip should be visibly highlighted

---

## F. Sort Chips

### Content
- `Popular`
- `Price`
- `New`

### Purpose
- allow simple product sorting

### Notes
- compact style
- clear active state

---

## G. Stats Row

### Content
- total apps
- total categories
- saved apps

### Purpose
- add light marketplace context
- reinforce that the page is interactive and alive

---

## H. Section Header

### Content
- eyebrow: `CATALOG`
- title: `Available solutions`
- side label: `Showing X apps`

### Purpose
- separate controls from results area

---

## I. App Cards Area

### Purpose
- main browsing zone

### Card Structure
Each card should contain:
- image
- top badge if relevant (`Best Seller`, `Popular`, `New`)
- save button
- category chip
- price
- title
- short description
- metadata block
- CTA button: `View Details`

### Layout
- horizontal card flow
- snap scrolling on mobile
- balanced card width
- good spacing between cards

### Notes
- cards must feel premium
- image should lead visually
- title and price must stand out
- save state should be easy to understand

---

## J. Pagination Dots

### Purpose
- indicate current visible card in horizontal flow

### Notes
- subtle by default
- active dot larger and highlighted

---

## K. Empty State

### Show when
- no apps match search/filter/sort state

### Content
- simple icon
- title: `No apps found`
- short supporting line

### Purpose
- keep zero-result state polished and helpful

---

## L. Lower Info Blocks

### Block 1
- browse by category
- category tags

### Block 2
- marketplace flow explanation
- short supportive copy

### Purpose
- add structure below the listing
- continue premium storytelling

---

## M. Footer

### Purpose
- shared footer consistency
- full navigation and contact availability

Must use:
- `CommonFooter`

---

## 5. Navigation Behavior

- card press → `AppDetails`
- `View Details` → `AppDetails`
- `Contact` → `Contact`
- custom banner CTA → `Contact`
- footer links → route accordingly

---

## 6. Interaction Notes

- filter chip active state must be clear
- sort state must be clear
- save button should toggle instantly
- horizontal card snapping should feel smooth
- pressed state should use light opacity + scale reduction

---

## 7. Success Criteria

The Apps screen succeeds if users can:
- browse quickly
- search quickly
- compare products visually
- save interesting apps
- move into details without friction