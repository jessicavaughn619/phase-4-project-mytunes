import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import "../stylesheets/EditPlaylistForm.scss"

const EditPlaylistForm = ({onEditPlaylistName, editedPlaylist, onSetEditedPlaylist, 
  onSetIsUpdatedPlaylist, onSetIsEditPlaylistName }) => {

    const { id, name } = editedPlaylist;
      
    const formSchema = yup.object().shape({
        name: yup.string().required("Playlist must have a name").max(25, "Playlist name cannot be longer than 25 characters"),
    });

    const formikPatch = useFormik({
      initialValues: {
        name: name,
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        const newName = values.name;
        const updatedValues = {...values, name: newName};

        fetch(`/playlists/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        }).then((r) => r.json())
        .then((updatedPlaylist) => onEditPlaylistName(updatedPlaylist))
        .finally(() => {
          onSetEditedPlaylist({id: null, name: null})
          onSetIsUpdatedPlaylist()
          onSetIsEditPlaylistName(false)
        })
      }
    })

    return (
        <>
        <form className="edit-playlist-form" onSubmit={formikPatch.handleSubmit}>
            <label htmlFor="name">Updated Playlist Name:</label>
            <input
            type="text"
            id="name"
            autoComplete="off"
            onChange={formikPatch.handleChange}
            value={formikPatch.values.name}
            />
            <p className="errors">{formikPatch.errors.name}</p>
            <button type="submit">Submit</button>
        </form>
        </>
    )
};

export default EditPlaylistForm;
      