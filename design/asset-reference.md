# Contact Wireframe — Sat Apps Marketplace

## 1. Purpose

The Contact screen is the inquiry and conversion page.

It should:
- feel premium and simple
- make inquiry easy
- support selected-app context
- move user toward submission without confusion

---

## 2. Main Goal

Users should be able to:
1. contact the business easily
2. request demo or custom project
3. submit details with minimal friction
4. feel supported and confident

---

## 3. Screen Flow Order

Top to bottom:

1. top bar
2. hero block
3. selected app banner (optional)
4. inquiry form
5. contact/process cards
6. common footer

---

## 4. Section-by-Section Wireframe

## A. Top Bar

### Content
- back button
- title: `Contact Us`
- home button

### Purpose
- simple navigation
- familiar pattern across screens

---

## B. Hero Block

### Content
- eyebrow: `START YOUR PROJECT`
- title
- short supporting paragraph

### Purpose
- make page feel inviting and premium
- explain what the page is for

---

## C. Selected App Banner

### Show when
- app is passed from `AppDetails`

### Content
- label: `Selected App`
- app title
- app price

### Purpose
- preserve product context
- make inquiry feel specific and personalized

---

## D. Inquiry Form

### Fields
- Full Name
- Email
- Phone
- Company / Brand
- Project Type
- Message

### CTA
- `Submit Inquiry`

### Purpose
- collect lead details
- keep form readable and premium

### Notes
- inputs should feel large and comfortable
- chips for project type should be easy to tap
- message box should be generous in height

---

## E. Contact / Process Cards

### Card 1
- `CONTACT`
- direct email, phone, location

### Card 2
- `PROCESS`
- simple 3-step explanation

### Purpose
- reduce friction
- answer “what happens next?”

---

## F. Footer

Must use:
- `CommonFooter`

Pass app context when available:
- `app={selectedApp}`

---

## 5. Navigation Behavior

- back → previous screen
- home → Home
- submit → form validation + submit flow
- footer links → normal routes

---

## 6. Success Criteria

The Contact screen succeeds if users:
- understand how to inquire
- can submit without friction
- feel guided and confident
- see clear next steps