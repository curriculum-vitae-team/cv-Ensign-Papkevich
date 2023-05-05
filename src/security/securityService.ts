import { makeVar } from "@apollo/client"
import { StorageKeys } from "@constants/StorageKeys.constants"
import { IUser } from "@interfaces/user.interface"

class SecurityService {
  access_token$ = makeVar("")
  user$ = makeVar<IUser | null>(null)
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
    this.readFromStorage()
  }

  public writeToStorage(user: IUser, access_token: string) {
    this.user$(user)
    this.access_token$(access_token)
    this.storage.setItem(StorageKeys.User, JSON.stringify(user))
    this.storage.setItem(StorageKeys.AccessToken, access_token)
  }

  private readFromStorage() {
    const user = this.storage.getItem(StorageKeys.User)
    const access_token = this.storage.getItem(StorageKeys.AccessToken)
    if (user && access_token) {
      this.user$(JSON.parse(user))
      this.access_token$(access_token)
    }
  }

  clearStorage() {
    this.user$(null)
    this.access_token$("")
    this.storage.removeItem(StorageKeys.User)
    this.storage.removeItem(StorageKeys.AccessToken)
  }
}

export const securityService = new SecurityService(sessionStorage)
