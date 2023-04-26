import { useForm } from "react-hook-form"
import { Button, TextField } from "@mui/material"
import { regExpForEmail } from "../../../../constants/RegExp.constants"
import { Form } from "./createUserForm.styles"
import { SelectInputField } from "./selectInputField"
import { useCreateUserFormData } from "../../../../hooks/createUserFormDataHook"
import { Spinner } from "../../../ui/spinner"
import { CREATE_USER_MUTATION } from "../../../../graphql/mutations/createUser"
import { USERS_QUERY } from "../../../../graphql/queries/users"
import { useMutation } from "@apollo/client"
import { CreateUserResult } from "../../../../graphql/mutations/mutations.types"

export const CreateUserForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { loading, departmentsData, positionsData, rolesData } =
    useCreateUserFormData()

  const [createUser, { loading: updateLoading }] =
    useMutation<CreateUserResult>(CREATE_USER_MUTATION, {
      refetchQueries: [{ query: USERS_QUERY }],
    })

  const onSubmit = async (inputs) => {
    try {
      await createUser({
        variables: {
          user: {
            auth: {
              email: inputs.email,
              password: inputs.password,
            },
            profile: {
              first_name: inputs.firstName,
              last_name: inputs.lastName,
              skills: [],
              languages: [],
            },
            departmentId: inputs.department,
            positionId: inputs.position,
            cvsIds: [],
            role: inputs.role,
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
            label="Email"
            variant="filled"
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
            {...register("email", {
              required: "This is required",
              pattern: {
                value: regExpForEmail,
                message: "Please enter a valid email",
              },
            })}
          />

          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            error={!!errors.password}
            helperText={errors.password ? String(errors.password.message) : ""}
            {...register("password", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 5) {
                  return "Password must be be at least 5 characters"
                }
              },
            })}
          />

          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            error={!!errors.firstName}
            helperText={
              errors.firstName ? String(errors.firstName.message) : ""
            }
            {...register("firstName", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 2) {
                  return "Please enter a valid First Name"
                }
              },
            })}
          />

          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            error={!!errors.lastName}
            helperText={errors.lastName ? String(errors.lastName.message) : ""}
            {...register("lastName", {
              required: "This is required",
              validate: (val: string) => {
                if (val.length < 2) {
                  return "Please enter a valid Last Name"
                }
              },
            })}
          />

          <SelectInputField
            label="Position"
            registerName="position"
            register={register}
            defaultValue={""}
            data={positionsData!.positions}
          />

          <SelectInputField
            label="Department"
            registerName="department"
            register={register}
            defaultValue={""}
            data={departmentsData!.departments}
          />

          <SelectInputField
            label="User Role"
            registerName="role"
            register={register}
            defaultValue={"employee"}
            data={rolesData}
          />

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}
