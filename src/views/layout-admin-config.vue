<template>
  <div>
    <v-divider color="#52555A"></v-divider>
    <!-- Backup Settings  -->
    <div class="backup-settings">
      <h2 class="group-label">Backup Settings</h2>

      <!-- Timepicker Field --------------------------------------------------------------------------------------->
      <div class="timepicker-field">
        <div class="time-label">Time</div>
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-button class="button-time" v-on="on">
              <span>{{ time }}</span>
              <v-icon class="button-icon-right">mdi-chevron-down</v-icon>
            </v-button>
          </template>

          <v-time-picker 
           class="time-picker"
           dark
           v-model="time" 
           ampm-in-title="ampmInTitle"           
           @change="$refs.menu.save(time)">
            <v-spacer></v-spacer>
            <v-btn color="#6f7276"  @click="dropdownOpen= false">Cancel</v-btn>
            <v-btn color="#6f7276" @click="$refs.dialog.save(time)">OK</v-btn>
          </v-time-picker>
        </v-menu>
      </div>

      <div class="frequency-field">
        <div class="frequency-label">Frequency</div>

        <v-combobox 
          color="#5f7bbe"
          class="frequency-combobox"
          label="Hours"
          :items="['Every 12 Hours', ' Every 24 Hours']"
          min-width="290px"
          
          outlined
          dense
          clearable
          @change="timeFormat"
        ></v-combobox>

        <!-- <v-button class="button-frequency">
          <span>24 Hours</span>
          <v-icon class="button-icon-right">mdi-chevron-down</v-icon>
        </v-button> -->
      </div>

      <div>
        <v-btn class="save-button" color="#333737">
          <span>Save</span>
        </v-btn>
      </div>
    </div>

    <!-- Database Backup  -->
    <v-divider color="#52555A"></v-divider>
    <h2 class="group-label">Database Backup</h2>
    <div>
      <v-btn class="download-button" color="#82efca">
        <img src="@/assets/images/download.svg" />
        <span>Download Backup</span>
      </v-btn>
    </div>
    <div>
      <v-btn class="import-button" color="#427AC4">
        <img src="@/assets/images/upload.svg" />
        <span>Import Backup</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      
    return {
        time: null,
        menu2: false,
        modal2: false
      }
  // return {
  // timeFormat: 'hh:mm a', 
  // Data: {
  //   hh: '03',
  //   mm: '05',
  //   a: 'A.M.'
  // } create computed formula for AM & PM

  }
};
</script>

<style lang="scss" scoped>
.page-header {
  color: #707070;
  letter-spacing: 1px;
}

.button-time {
  background-color: #202224;
  height: 40px;
  padding: 10px 24px 10px 24px;
  margin-left: 51px;
  font-weight: 500;
  color: #494c4f;

  &:hover {
    filter: brightness(0.95);
  }
}

.button-frequency {
  background-color: #202224;
  height: 40px;
  padding: 10px 24px 10px 24px;
  margin-left: 10px;
  font-weight: 500;

  &:hover {
    filter: brightness(0.95);
  }
}

.button-icon-right {
  font-size: 18px;
  margin-left: 8px;
  color: white;
  opacity: 0.6;
}

.timepicker-field {
  display: flex;
}


.time-field {
  display: flex;
  color: #494c4f;
  margin: 20px 0px 0px 0px;
}

.time-label {
  margin: 7px 10px 0px 0px;
  color: #494c4f;
  //background-color: blue;
}

.frequency-field {
  display: flex;
  color: #494c4f;
  margin: 10px 0px 20px 0px;
}

.frequency-combobox {
    margin: 0px 20px 0px 0px;
    width: 20%;
}

.frequency-label {
  margin: 8px 20px 10px 0px;
}

.group-label {
  color: #494c4f;
  margin: 20px 0px 0px 0px;
}

.save-button {
  width: 20%;
  border-radius: 5px;
  border: none;
  padding: 15px;
  color: #6f7276;
  font-size: 14px;
  margin: 0px 0px 50px 0px;
  text-transform: none;

  &:hover {
    cursor: pointer;
    background-color: #8bffd8;
  }
}

.download-button {
  width: 20%;
  border-radius: 5px;
  border: none;
  padding: 15px;
  color: white;
  font-size: 14px;
  margin: 20px 0px 0px 0px;
  text-transform: none;

  &:hover {
    cursor: pointer;
    background-color: #8bffd8;
  }
}

.import-button {
  width: 20%;
  border-radius: 5px;
  border: none;
  padding: 15px;
  color: #bcdbff;
  font-size: 14px;
  margin: 20px 0px 0px 0px;
  text-transform: none;

  &:hover {
    cursor: pointer;
    background-color: #8bffd8;
  }
}

.backup-settings {
  display: flex;
  flex-direction: column;
}
</style>