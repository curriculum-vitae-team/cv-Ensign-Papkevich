import { useState } from "react"
import { useQuery } from "@apollo/client"
import { LANGUAGES_QUERY } from "@graphql/queries/languages"
import { LanguagesResult } from "@graphql/queries/queries.types"
import { ILanguage } from "@interfaces/language.interface"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { BasicModal } from "@templates/modal/modal"
import { CreateLanguageForm } from "./create-language-modal/createLanguageForm"

const Table = createTable<ILanguage>()

const Languages = () => {
  const { data, loading } = useQuery<LanguagesResult>(LANGUAGES_QUERY)
  const [open, setOpen] = useState(false)

  const handleCreateLanguage = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Table
        items={data?.languages || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["name", "native_name", "iso2"]}
        defaultSortBy="name"
        additionalBtnName="ADD NEW LANGUAGE"
        additionalBtnAction={handleCreateLanguage}
      />
      <BasicModal
        open={open}
        onClose={handleClose}
        modalTitle="Add new language"
      >
        <CreateLanguageForm handleClose={handleClose} />
      </BasicModal>
    </>
  )
}

export default Languages
