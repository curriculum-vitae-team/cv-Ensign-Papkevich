import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField, MenuItem } from "@mui/material"
import { regExpForEmail } from "@constants/RegExp.constants"
import { Form } from "./createUserForm.styles"
import { SelectInputField } from "@templates/select-input-field"
import { useCreateUserFormData } from "@hooks/createUserFormDataHook"
import { Spinner } from "@ui/spinner"
import { CREATE_USER_MUTATION } from "@graphql/mutations/createUser"
import { USERS_QUERY } from "@graphql/queries/users"
import { CreateUserResult } from "@graphql/mutations/mutations.types"

export const CreateUserForm = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { loading, departmentsData, positionsData, rolesData } =
    useCreateUserFormData()

  const [createUser, { loading: updateLoading }] =
    useMutation<CreateUserResult>(CREATE_USER_MUTATION, {
      refetchQueries: [{ query: USERS_QUERY }],
    })

  const onSubmit = async (inputs) => {
    console.log(inputs)
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
            name="position"
            control={control}
            defaultValue={""}
            data={positionsData!.positions}
          />

          <SelectInputField
            label="Department"
            name="department"
            control={control}
            defaultValue={""}
            data={departmentsData!.departments}
          />

          {/* <SelectInputField
            label="User Role"
            name="role"
            control={control}
            defaultValue={"employee"}
            data={rolesData}
          /> */}
          <TextField
            select
            fullWidth
            label="Role"
            defaultValue=""
            inputProps={register("role")}
          >
            {rolesData.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}
