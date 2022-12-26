import { makeVar } from "@apollo/client"
import { StorageKeys } from "../constants/StorageKeys.constants"

class SecurityService {
  access_token$ = makeVar("")
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
    this.readFromStorage()
  }

  public writeToStorage(access_token: string) {
    this.access_token$(access_token)
    this.storage.setItem(StorageKeys.AccessToken, access_token)
  }

  private readFromStorage() {
    const access_token = this.storage.getItem(StorageKeys.AccessToken)
    if (access_token) {
      this.access_token$(access_token)
    }
  }
}

export const securityService = new SecurityService(sessionStorage)
