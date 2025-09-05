# Pulumi Pretty

Pulumi's previews are great, but reviewing them kinda sucks. Especially when it's running in a CI/CD pipeline. How about an interactive preview instead?

## Usage

```jsx
import { PulumiPretty } from "pulumi-pretty";

export default function Preview() {
  const contents = "{ steps: [...] }";
  return <PulumiPretty text={contents} />;
}
```
