import { useEffect, useState, memo } from "react"
import { useQuery } from "@apollo/client"
import { ResponsiveCalendar } from "@nivo/calendar"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { UsersQueryResult } from "../../../graphql/queries/queries.types"
import { USERS_QUERY } from "../../../graphql/queries/users"
import { Spinner } from "@ui/spinner"
import { ICalendarDatum } from "@interfaces/calendar-datum.interface"
import { countUsersByDate } from "./helpers/count-users-by-date"
import { countUsersByRole } from "./helpers/count-users-by-role"
import { countUsersByDepartment } from "./helpers/count-users-by-department"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Statistics = () => {
  const { data, loading } = useQuery<UsersQueryResult>(USERS_QUERY)
  const [calendarChartData, setCalendarChartData] = useState<ICalendarDatum[]>(
    []
  )
  const [usersByRoleData, setUsersByRoleData] = useState<
    { id: string; value: number; label?: string }[]
  >([])
  const [usersByDepartmentData, setUsersByDepartmentData] = useState<
    { department: string; count: number; label?: string }[]
  >([])

  useEffect(() => {
    if (data) {
      const createdUsersByDate = countUsersByDate(data.users)
      setCalendarChartData(createdUsersByDate)

      const usersByRole = countUsersByRole(data.users)
      setUsersByRoleData(usersByRole)

      const usersByDepartment = countUsersByDepartment(data.users)
      setUsersByDepartmentData(usersByDepartment)
    }
  }, [data])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              marginBottom: "15px",
              marginTop: "15px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              borderTop: "6px solid #508AA8",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ marginBottom: "10px" }}
            >
              New Users
            </Typography>
            <Box sx={{ height: "250px" }}>
              <ResponsiveCalendar
                data={calendarChartData}
                from={
                  calendarChartData.length > 0 ? calendarChartData[0].day : ""
                }
                to={
                  calendarChartData.length > 0
                    ? calendarChartData[calendarChartData.length - 1].day
                    : ""
                }
                emptyColor="#eeeeee"
                colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                monthLegendOffset={10}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "row",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left",
                  },
                ]}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginBottom: "15px",
            }}
          >
            <Box
              sx={{
                width: "30%",
                marginRight: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                borderTop: "6px solid #508AA8",
              }}
            >
              <Typography variant="h5" component="h2">
                Users by Role
              </Typography>
              <Box sx={{ height: "350px" }}>
                <ResponsivePie
                  data={usersByRoleData}
                  colors={["#61cdbb", "#e8c1a0"]}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  animate={true}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "70%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                borderTop: "6px solid #508AA8",
              }}
            >
              <Typography variant="h5" component="h2">
                Users By Department
              </Typography>
              <Box sx={{ height: "350px" }}>
                <ResponsiveBar
                  data={usersByDepartmentData}
                  keys={["count"]}
                  indexBy="department"
                  margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
                  axisBottom={{
                    tickSize: 4,
                    tickPadding: 4,
                    tickRotation: -15,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Number of Users",
                    legendPosition: "middle",
                    legendOffset: -50,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  animate={true}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default memo(Statistics)
