<template>
    <h2 v-if="!contactsList.length">There is no Contacts Saved</h2>
    <h2 v-if="contactsList.length">Saved Contact</h2>
    <div v-if="contactsList.length" class="d-flex">
        <div>
            Filter
        </div>
        <div class="mx-5">
            <input type="text" v-model="filterText" @keyup="filterList()">
        </div>
    </div>
    <table class="table" v-if="contactsList.length">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">DOB</th>
                <th scope="col">Notes</th>
                <th scope="col">Profile Picture</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="(contact, index) in filteredListArr" :key="index">
                <th scope="row">{{ index }}</th>
                <td>{{ contact.name }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.phone }}</td>
                <td>{{ formattedDate(contact.dob) }}</td>
                <td>{{ contact.notes }}</td>
                <td>{{ contact.profilePicture }}</td>
                <td class="d-flex">
                    <div class="delete" @click="deleteOne(index,contact.name)">

                        <font-awesome-icon icon="trash" />
                    </div>
                    <div class="mx-3" @click="onEdit(index)">

                        <font-awesome-icon icon="pen-square" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-block">

        <button class="btn btn-info float-end mx-5" @click="addContact()">Add Contact</button>
    </div>
</template>
<style></style>
<script>
import moment from 'moment';
export default {

    data() {
        return {
            filterText: '',
            contacts: [],
            filteredListArr: [],
            contactsList: []
        };
    },
    computed: {
  
  },
    mounted() {
        let contactsLoc = localStorage;
        for (let i = 0; i < contactsLoc.length; i++) {
            this.contacts.push(JSON.parse(contactsLoc[i]))
        }
        this.filteredList()
    },
    methods: {
        async deleteOne(id,name) {
            let deletedItem = JSON.parse(localStorage[id])
            console.log('deletedItem---', deletedItem);
            confirm("Are you sure to delete:"+name)
            deletedItem.isDeleted = 1
            localStorage.setItem(id, JSON.stringify(deletedItem));
            this.filteredListArr = this.contacts.filter((dd) => dd.isDeleted == 0)
            alert('Contact Added Successfull,Hard Refresh Required')
        },
        onEdit(id) {
            this.$router.push({
                path: '/addupdate', query: { id: id }
            });
        },
        addContact() {
            this.$router.push({
                path: '/addupdate'
            });
        },
        filteredList() {
            this.contactsList = this.contacts.filter((dd) => dd.isDeleted == 0)
            this.filteredListArr = this.contactsList
        },
        filterList() {
            console.log('filterText:', this.filterText);
            const filteredContacts = Object.keys(this.contactsList).reduce((result, key) => {
                if (this.contactsList[key].name.includes(this.filterText)||this.contactsList[key].email.includes(this.filterText)||this.contactsList[key].phone.includes(this.filterText)||this.contactsList[key].notes.includes(this.filterText)) {
                    result[key] = this.contactsList[key];
                }
                return result;
            }, {});
            console.log(filteredContacts);
            this.filteredListArr=filteredContacts
        },
        formattedDate(date) {
        return moment(date).format('Do MMM YYYY')
    },
    }
}
</script>
<style lang="scss"></style>