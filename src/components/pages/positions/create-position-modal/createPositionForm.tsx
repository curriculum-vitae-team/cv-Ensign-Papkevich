import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { Form } from "./createPositionForm.styles"
import { Spinner } from "@ui/spinner"
import { CREATE_POSITION_MUTATION } from "@graphql/mutations/createPosition"
import { POSITIONS_QUERY } from "@graphql/queries/positions"
import { CreatePositionResult } from "@graphql/mutations/mutations.types"

export const CreatePositionForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createPosition, { loading }] = useMutation<CreatePositionResult>(
    CREATE_POSITION_MUTATION,
    {
      refetchQueries: [{ query: POSITIONS_QUERY }],
    }
  )

  const onSubmit = async (inputs) => {
    try {
      await createPosition({
        variables: {
          position: {
            name: inputs.name,
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

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}
