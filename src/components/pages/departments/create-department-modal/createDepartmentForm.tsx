import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { Form } from "./createDepartmentForm.styles"
import { Spinner } from "@ui/spinner"
import { CREATE_DEPARTMENT_MUTATION } from "@graphql/mutations/createDepartment"
import { DEPARTMENTS_QUERY } from "@graphql/queries/departments"
import { CreateDepartmentResult } from "@graphql/mutations/mutations.types"

export const CreateDepartmentForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createDepartment, { loading }] = useMutation<CreateDepartmentResult>(
    CREATE_DEPARTMENT_MUTATION,
    {
      refetchQueries: [{ query: DEPARTMENTS_QUERY }],
    }
  )

  const onSubmit = async (inputs) => {
    try {
      await createDepartment({
        variables: {
          department: {
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
