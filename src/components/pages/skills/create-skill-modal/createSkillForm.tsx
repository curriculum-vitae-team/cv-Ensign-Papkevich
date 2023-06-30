import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { Form } from "./createSkillForm.styles"
import { Spinner } from "@ui/spinner"
import { CREATE_SKILL_MUTATION } from "@graphql/mutations/createSkill"
import { SKILLS_QUERY } from "@graphql/queries/skills"
import { CreateSkillResult } from "@graphql/mutations/mutations.types"

export const CreateSkillForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createSkill, { loading }] = useMutation<CreateSkillResult>(
    CREATE_SKILL_MUTATION,
    {
      refetchQueries: [{ query: SKILLS_QUERY }],
    }
  )

  const onSubmit = async (inputs) => {
    try {
      await createSkill({
        variables: {
          skill: {
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
