import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { Form } from "./createLanguageForm.styles"
import { Spinner } from "@ui/spinner"
import { CREATE_LANGUAGE_MUTATION } from "@graphql/mutations/createLanguage"
import { LANGUAGES_QUERY } from "@graphql/queries/languages"
import { CreateLanguageResult } from "@graphql/mutations/mutations.types"

export const CreateLanguageForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createLanguage, { loading }] = useMutation<CreateLanguageResult>(
    CREATE_LANGUAGE_MUTATION,
    {
      refetchQueries: [{ query: LANGUAGES_QUERY }],
    }
  )

  const onSubmit = async (inputs) => {
    console.log(inputs)
    try {
      await createLanguage({
        variables: {
          language: {
            name: inputs.name,
            iso2: inputs.iso2,
            native_name: inputs.nativeName || "",
          },
        },
      })
      handleClose()
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            error={!!errors.name}
            helperText={errors.name ? String(errors.name.message) : ""}
            {...register("name", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 2) {
                  return "Please enter a valid name"
                }
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Native Name"
            variant="filled"
            error={!!errors.nativeName}
            helperText={
              errors.nativeName ? String(errors.nativeName.message) : ""
            }
            {...register("nativeName", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 2) {
                  return "Please enter a valid name"
                }
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="ISO 2"
            variant="filled"
            error={!!errors.iso2}
            helperText={errors.iso2 ? String(errors.iso2.message) : ""}
            {...register("iso2", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 2) {
                  return "Please enter a valid iso2"
                }
              },
            })}
          />

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}
