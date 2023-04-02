import { useForm } from "react-hook-form"
import { Typography, Button, TextField } from "@mui/material"
import { regExpForEmail } from "../../../../constants/RegExp.constants"
import { Form } from "./createUserForm.styles"

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //   const [createUser, { data, loading, error }] =
  //     useMutation(CREATEUSER_MUTATION)
  const createUser = (variables) => {
    console.log("create user")
  }
  const onSubmit = async (data) => {
    await createUser({
      variables: {
        user: {
          auth: {
            email: data.email,
            password: data.password,
          },
          profile: {
            first_name: data.firstName,
            last_name: data.lastName,
            skills: [],
            languages: [],
          },
          departmentId: data.department,
          positionId: data.position,
          cvsIds: [],
          role: data.role,
        },
      },
    })
  }

  return (
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
      <TextField
        id="filled-basic"
        label="First Name"
        variant="filled"
        error={!!errors.firstName}
        helperText={errors.firstName ? String(errors.firstName.message) : ""}
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
        label="Position"
        variant="filled"
        error={!!errors.position}
        helperText={errors.position ? String(errors.position.message) : ""}
        {...register("position", {
          required: "This is required",
        })}
      />
      <TextField
        id="filled-basic"
        label="Department"
        variant="filled"
        error={!!errors.department}
        helperText={errors.department ? String(errors.department.message) : ""}
        {...register("department", {
          required: "This is required",
        })}
      />
      <TextField
        id="filled-basic"
        label="Role"
        variant="filled"
        error={!!errors.role}
        helperText={errors.role ? String(errors.role.message) : ""}
        {...register("role", {
          required: "This is required",
        })}
      />

      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </Form>
  )
}
