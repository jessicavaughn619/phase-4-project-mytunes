import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";

const NewPlaylistForm = ({onIsAddedPlaylist, onAddNewPlaylist, onPlaylistForm }) => {

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a playlist name").max(15),
    });

    const formik = useFormik({
        initialValues: {
        name: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/playlists', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((r) => r.json())
            .then((newPlaylist) => onAddNewPlaylist(newPlaylist))
            .finally(() => {
                onPlaylistForm(false)
                onIsAddedPlaylist()
    });
    }
});

  return (
    <form className="new-playlist-form" onSubmit={formik.handleSubmit}>
      <label htmlFor="name">New Playlist Name</label>
      <input
        type="text"
        id="name"
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPlaylistForm;