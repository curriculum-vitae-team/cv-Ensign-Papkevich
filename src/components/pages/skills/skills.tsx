import { useState } from "react"
import { useQuery } from "@apollo/client"
import { SKILLS_QUERY } from "@graphql/queries/skills"
import { SkillsResult } from "@graphql/queries/queries.types"
import { ISkill } from "@interfaces/skill.interface"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { BasicModal } from "@templates/modal/modal"
import { CreateSkillForm } from "./create-skill-modal/createSkillForm"

const Table = createTable<ISkill>()

const Skills = () => {
  const { data, loading } = useQuery<SkillsResult>(SKILLS_QUERY)
  const [open, setOpen] = useState(false)

  const handleCreateSkill = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Table
        items={data?.skills || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["name"]}
        defaultSortBy="name"
        additionalBtnName="ADD NEW SKILL"
        additionalBtnAction={handleCreateSkill}
      />
      <BasicModal open={open} onClose={handleClose} modalTitle="Add new skill">
        <CreateSkillForm handleClose={handleClose} />
      </BasicModal>
    </>
  )
}

export default Skills
