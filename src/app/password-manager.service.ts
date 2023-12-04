import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addsite(data: object) {
    const dbInstance = collection(this.firestore, 'Sites')
    return addDoc(dbInstance, data)
  }

  loadsites(){
    const dbInstance = collection(this.firestore, 'Sites')
    return collectionData(dbInstance, { idField: "id" } )
  }

  updatesite(id: string, data: object){
    const docInstance = doc(collection(this.firestore, 'Sites'), id)
    return updateDoc(docInstance, data)
  }

  deletesite(id: string) {
    const docInstance = doc(collection(this.firestore, 'Sites'), id)
    return deleteDoc(docInstance)
  }

  // password queries

  addpaswword(siteId: string, data: object){
    const dbInstance = collection(this.firestore, `Sites/${siteId}/Passwords`)
    return addDoc(dbInstance, data)
  }

  loadpasswords(siteId: string){
    const dbInstance = collection(this.firestore, `Sites/${siteId}/Passwords`)
    return collectionData(dbInstance, { idField: "id" } )
  }

  updatepassword(siteId: string, id: string, data: object){
    const docInstance = doc(collection(this.firestore, `Sites/${siteId}/Passwords`), id)
    return updateDoc(docInstance, data)
  }

  deletepassword(siteId: string, id: string) {
    const docInstance = doc(collection(this.firestore, `Sites/${siteId}/Passwords`), id)
    return deleteDoc(docInstance)
  }

}
