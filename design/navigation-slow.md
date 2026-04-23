# Navigation Flow — Sat Apps Marketplace

## 1. Purpose

This document defines how users move through the app marketplace.

It should make the product flow:
- simple
- predictable
- premium
- conversion-friendly

The navigation should never feel confusing or too deep.

---

## 2. Main Screens

Primary screens in the app:

- Home
- Apps
- AppDetails
- About
- Contact

These are the core marketplace routes.

---

## 3. Primary Navigation Structure

## Entry Point
- `Home`

## Main browsing route
- `Home` → `Apps` → `AppDetails`

## Brand trust route
- `Home` → `About`

## Conversion route
- `Home` → `Contact`
- `Apps` → `Contact`
- `AppDetails` → `Contact`
- `About` → `Contact`

---

## 4. Route List

### Home
Purpose:
- landing page
- first impression
- guide users into browsing or contact

### Apps
Purpose:
- all products catalog
- filtering, sorting, search
- product discovery

### AppDetails
Purpose:
- premium product detail page
- explain app value
- push toward demo/contact

### About
Purpose:
- explain company
- build trust
- support conversion

### Contact
Purpose:
- collect inquiries
- request demo
- start custom project flow

---

## 5. Screen-to-Screen Flow

## Home → Apps
Triggered by:
- `Explore Apps`
- `Browse Apps`
- `See all`
- footer marketplace links

Purpose:
- move user into full product discovery

---

## Home → AppDetails
Triggered by:
- featured app card press
- premium highlight CTA
- featured product card press

Purpose:
- let user jump directly into a product

---

## Home → About
Triggered by:
- future header/footer/about link
- footer brand/company navigation

Purpose:
- let user learn about the company

---

## Home → Contact
Triggered by:
- `Contact Us`
- `Start Project`
- footer support/contact links

Purpose:
- conversion path from landing page

---

## Apps → AppDetails
Triggered by:
- app card press
- `View Details`

Purpose:
- product exploration

---

## Apps → Contact
Triggered by:
- `Contact`
- custom app banner CTA
- footer support links

Purpose:
- custom inquiry from catalog page

---

## AppDetails → Contact
Triggered by:
- `Request Demo`
- `Contact Us`
- sticky bottom CTA
- footer support links

Purpose:
- high-intent conversion

### Route behavior
When coming from `AppDetails`, pass selected app context:

```txt
Contact({ app })