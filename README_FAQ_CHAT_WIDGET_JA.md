# AI of One's Own / 育てるAI FAQ chat widget patch - Japanese

This patch adds the Japanese FAQ chat widget to the official website.

## Critical correction

The original AnythingLLM code used:

```html
data-base-api-url="http://localhost:3011/api/embed"
src="http://localhost:3011/embed/anythingllm-chat-widget.min.js"
```

Do not use that on the public website.

`localhost` means the visitor's own computer, not your support server.

Use this public URL instead:

```text
https://support.aiofonesown.com
```

## Files

```text
snippets/faq-chat-box-ja.html
snippets/faq-chat-box-ja-style.html
snippets/anythingllm-widget-ja-before-body.html
```

## Where to paste

### 1. FAQ area

Paste this file inside the existing FAQ section:

```text
snippets/faq-chat-box-ja.html
```

Preferably place it after the FAQ list.

### 2. Optional style

Paste this file into your existing `<style>` block or CSS file:

```text
snippets/faq-chat-box-ja-style.html
```

This is optional.

### 3. Bottom of HTML

Paste this file immediately before the closing `</body>` tag:

```text
snippets/anythingllm-widget-ja-before-body.html
```

## Final public widget script

```html
<script
  data-embed-id="7f525333-502e-4f90-b0b3-3a12cbe23b4d"
  data-base-api-url="https://support.aiofonesown.com/api/embed"
  src="https://support.aiofonesown.com/embed/anythingllm-chat-widget.min.js">
</script>
```

## GitHub commit message

```text
Add Japanese FAQ chat widget
```

## Post-deploy checks

Open:

```text
https://aiofonesown.com
https://www.aiofonesown.com
```

Then confirm:

- The FAQ area displays the Japanese support block.
- The chat widget appears.
- The browser console does not show blocked `localhost` requests.
- The widget connects to `https://support.aiofonesown.com`.
