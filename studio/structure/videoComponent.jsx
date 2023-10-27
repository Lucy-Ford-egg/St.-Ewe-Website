import { PatchEvent, set, unset } from "sanity";
import React, { useState } from "react";
import getVideoId from "get-video-id";
import {useFormValue} from 'sanity'
import { nanoid } from "nanoid";
import { TextInput, Stack, Button } from "@sanity/ui";
import { AddIcon } from "@sanity/icons";

const VideoIdFieldComponent = (props, ref) => {
  const { onChange, value } = props;

  const [newDoc, setNewDoc] = useState(value || null);

  const createPatchFrom = (value) =>
    PatchEvent.from(value === "" ? unset() : set(value));

  async function getThumbnail({ id, service }) {
    if (service === "youtube") {
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }

    if (service === "vimeo") {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${id}`
      );
      const json = await response.json();
      return json.thumbnail_url.split("_")[0] + "_320x180";
    }

    return null;
  }

  async function onUrlChange(e) {
    const url = e.target.value;

    if (url.trim().length) {
      const { id, service } = getVideoId(url);
      const thumbnail = await getThumbnail({ id, service });
      setNewDoc({ url, id, service, thumbnail });
    } else {
      setNewDoc(null);
    }
  }

  function save() {
    onChange(
      createPatchFrom({
        _key: nanoid(),
        _type: "videoId",
        ...newDoc,
      })
    );
  }

  const videoUrl = useFormValue([`url`])

  return (
    <Stack space={3}>
      <TextInput
        type="text"
        name={videoUrl}
        onChange={onUrlChange}
        ref={ref}
        value={newDoc?.url}
      />

      {newDoc?.thumbnail && <img src={newDoc.thumbnail} />}

      <Button
        text={`Create`}
        fontSize={2}
        icon={AddIcon}
        padding={3}
        tone="positive"
        onClick={save}
      />
    </Stack>
  );
};

// function MyInput() {
//   const title = useFormValue([`title`])
//   return (
//     <div>
//       Document title: {title}
//       {/* ... */}
//     </div>
//   )
// }

export const VideoIdField = React.forwardRef(VideoIdFieldComponent);