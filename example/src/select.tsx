import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

import { ErrorMessage, Field, Label } from "pulumi-pretty/components/fieldset";
import { Button } from "pulumi-pretty/components/button";
import { Divider } from "pulumi-pretty/components/divider";
import { Input } from "pulumi-pretty/components/input";
import { Text, TextLink } from "pulumi-pretty/components/text";

export const Select = ({
  error,
  setEncodedUrl,
  setContents,
}: {
  error?: string;
  setEncodedUrl: (encoded: string) => void;
  setContents: (contents: string) => void;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col gap-4 w-xl max-w-full">
        <h1 className="text-transparent bg-clip-text bg-blue-500 font-semibold text-5xl/14 bg-[linear-gradient(90deg,#f7bf2a,#f26e7e_18.23%,#be5188_38.02%,#8a3391_53.65%,#805ac3_74.48%,#7682f4)]">
          Pulumi:Pretty
        </h1>
        <Field>{error && <ErrorMessage>{error}</ErrorMessage>}</Field>
        <Text>
          Pulumi's previews are great, but reviewing them kinda sucks.
          Especially when it's running in a CI/CD pipeline. How about an
          interactive preview instead?
        </Text>
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const file = e.currentTarget.file.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const contents = event.target?.result;
                if (typeof contents === "string") {
                  setContents(contents);
                }
              };
              reader.readAsText(file);
            }
          }}
        >
          <Field className="flex-1">
            <Label>What would you like to preview?</Label>
            <Input name="file" type="file" />
          </Field>
          <Button type="submit" color="indigo">
            <PaperAirplaneIcon />
          </Button>
        </form>
        <Divider />
        <Text>
          Alternatively, you can generate a link to your hosted JSON file <br />
          (e.g.
          <TextLink href="/#url=https://your.json.com">
            {window.location.origin}/#url=https://your.json.com
          </TextLink>
          )
        </Text>
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setEncodedUrl(btoa(e.currentTarget.url.value));
          }}
        >
          <Field className="flex-1">
            <Label>Where is your hosted preview?</Label>
            <Input
              name="url"
              inputMode="url"
              placeholder="https://your.json.com"
            />
          </Field>
          <Button type="submit" color="indigo">
            <PaperAirplaneIcon />
          </Button>
        </form>
        <Divider />
        <Text>
          And, last but not least, you can use the component yourself however
          you want!
        </Text>
        <a href="https://www.npmjs.com/package/pulumi-pretty" target="_blank">
          <img src="https://img.shields.io/npm/v/pulumi-pretty" />
        </a>
        <Divider />
        <Text>
          Just in case you're worried, all the processing happens locally. Your
          data isn't going anywhere.
        </Text>
      </div>
    </div>
  );
};
