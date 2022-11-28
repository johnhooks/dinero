# dinero

test action

<p align="center">
  <strong>This repository is a port of the awesome <a href="https://v2.dinerojs.com/">Dinero.js</a> package by <a href="https://github.com/sarahdayan">Sarah Dayan</a> to a Deno module</strong>
</p>

<p align="center">
  Dinero lets you create, calculate, and format money safely in Deno.
</p>

---

Money is complex, and the primitives of the language aren't enough to properly
represent it. Dinero is a Deno library that lets you express monetary values,
but also perform mutations, conversions, comparisons, formatting, and overall
make money manipulation easier and safer in your application.

## ⚡️ Quick start

`Dinero` objects are minimal. Every function in `dinero` is side-effect free,
allowing you only to bundle exactly what you use.

```js
import { USD } from "https://raw.githubusercontent.com/johnhooks/dinero/v2.0.0-alpha.10/currencies.ts";
import {
  add,
  dinero,
} from "https://raw.githubusercontent.com/johnhooks/dinero/v2.0.0-alpha.10/mod.ts'";

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

add(d1, d2);
```
