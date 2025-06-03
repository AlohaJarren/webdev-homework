## Code Review Exercise

---

### Issue #1: Lack of Semantic Grouping for Related Form Inputs

**The issue:** In the form section under "What breeds would you like to learn?", multiple checkbox inputs are presented without semantic structure. They are wrapped in a `<div>` with a class of `form-fieldset`, but no actual `<fieldset>` or `<legend>` is used.

**Why this is a problem:** HTML5 provides structural elements like `<fieldset>` and `<legend>` specifically to group related form inputs in a way that screen readers can recognize and communicate to users. Without these tags, assistive technologies interpret each checkbox independently, missing the context that these checkboxes belong to a common category. This violates accessibility best practices covered in our course when we discussed semantic HTML and ARIA.

**The fix:** I replaced the `<div>` with an actual `<fieldset>` and included a `<legend>` that mirrors the original label text. This approach improves screen reader navigation and maintains visual consistency with minor or no CSS changes.

**Original code:**

```html
<div class="form-fieldset form-element-container">
  <p class="form-label">What breeds would you like to learn?</p>
  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>
  <!-- other checkboxes omitted for brevity -->
</div>
```

**Updated code:**

```html
<fieldset class="form-fieldset form-element-container">
  <legend class="form-label">What breeds would you like to learn?</legend>
  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>
  <!-- other checkboxes omitted for brevity -->
</fieldset>
```

---

### Issue #2: Improper Use of Anchor Tag for Button-Like Behavior

**The issue:** The "More Info" elements in each `.card` section are currently implemented using `<a>` tags without an `href`. While they are styled and function like buttons, this misuse leads to semantic and accessibility issues.

**Why this is a problem:** Anchor tags (`<a>`) are intended for navigation and must include an `href` to be treated as interactive by assistive technologies. In contrast, `<button>` elements are designed for triggering actions. A screen reader may skip or misreport anchor elements that lack valid destinations, impairing usability for non-visual users. Moreover, this can break keyboard navigation flows, which contradicts the accessibility principles emphasized in our lecture on DOM interactions.

**The fix:** I converted each `<a class="more-info-button">` into `<button type="button" class="more-info-button">` to make their purpose clear and accessible, aligning with best practices discussed in class.

**Original code:**

```html
<a class="more-info-button">More Info</a>
```

**Updated code:**

```html
<button class="more-info-button" type="button">More Info</button>
```

---

### Issue #3: Misuse of Paragraph Tags for Label-Input Groups

**The issue:** Each form input and label pairing (e.g., Name, Username, Email) is wrapped inside a `<p>` tag. While this visually works, it's semantically incorrect.

**Why this is a problem:** Paragraph tags are intended for textual content, not for grouping interactive controls. Using them this way violates HTML semantics and may interfere with screen reader navigation or lead to unpredictable behavior in future CSS refactors. This contradicts what we learned about using semantic containers (`<div>` or `<label>`) when structuring forms to promote accessibility and clean markup.

**The fix:** I replaced `<p>` tags with `<div>` and explicitly associated each label with its corresponding input using the `for` attribute. This strengthens both semantics and accessibility without altering layout or styling.

**Original code:**

```html
<p class="label-input-group form-element-container">
  <span class="form-label">Name</span>
  <input
    aria-label="name"
    class="form-input-box"
    type="text"
    id="name"
    name="name"
  />
</p>
```

**Updated code:**

```html
<div class="label-input-group form-element-container">
  <label for="name" class="form-label">Name</label>
  <input
    aria-label="name"
    class="form-input-box"
    type="text"
    id="name"
    name="name"
  />
</div>
```

---

Each of these issues touches on core principles we covered in CS 563 — semantic HTML, accessibility, and proper structuring of interactive elements. The fixes demonstrate attention to both user experience and technical correctness. These changes not only improve screen reader behavior but also enhance keyboard navigation and overall site robustness. I aimed to elevate the user interface to be more inclusive while staying grounded in what we've practiced and preached in this course.
