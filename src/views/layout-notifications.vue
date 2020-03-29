<template>
  <div>
    <div class="content-container">
      <h3 class="notifications-daterange">Today</h3>
      <ul class="notifications-itemlist">
        <!-- template: extreme emotion : angry --------------------------------------------------------------------->
        <!-- <li class="extreme-emotion-notification unread">
          <div class="employee">
            <img src="/sample-image.png" alt="employee" class="avatar" />
            <img src="/emotions/1.png" alt="" class="sentiment" />
          </div>
          <span class="notification-message">
            Oh no! <span class="employee-name">Lorem Ipsum</span> is feeling
            <span class="emotion">"angry"</span> ["today" | "(February 27,
            2020)"]. Reach out to your employees personally or by send them an
            email to see how they're doing.
          </span>
        </li> -->

        <!-- template: extreme emotion : amazing --------------------------------------------------------------------->
        <!-- <li class="extreme-emotion-notification unread">
          <div class="employee">
            <img src="/sample-image.png" class="avatar" />
            <img src="/emotions/5.png" class="sentiment" />
          </div>
          <span class="notification-message">
            Wow! <span class="employee-name">Lorem Ipsum</span> is feeling
            <span class="emotion">"amazing"</span> ["today" | "(February 27,
            2020)"]. Reach out to your employees personally or by send them an
            email to see how they're doing.
          </span>
        </li> -->

        <!-- template: change password --------------------------------------------------------------------->
        <!-- <li class="change-password-notification unread">
          <div class="employee">
            <img src="/default-avatar.png" alt="employee" class="avatar" />
          </div>
          <span class="notification-message">
            Your password has been changed on
            <span class="date-time"
              >(Thursday - 11:36 AM, February 27, 2019)</span
            >. If this looks suspicious please contact your administrator
            immediately.
          </span>
        </li> -->

        <li v-for="item in notifications" :key="item._id">
          <!-- template: password changed ----------------------------------------------------------------->
          <div
            v-if="item.type === 'USER-CHANGED_PASSWORD'"
            class="notification_item"
          >
            <div class="employee">
              <img :src="'/default-avatar.png' || reciever.photo" alt="employee" class="avatar" />
            </div>
            <span class="notification-message">
              Your password has been changed on
              <span class="date-time">({{ item.date }})</span>. If this looks
              suspicious please contact your administrator immediately.
            </span>
          </div>

          <!-- template: extreme emotion : angry ---------------------------------------------------------->
          <div
            v-else-if="
              item.type === 'EMPLOYEE-EXTREME_EMOTION' && item.emotion === 1
            "
            class="notification_item"
          >
            <div class="employee">
              <img src="/sample-image.png" alt="employee" class="avatar" />
              <img src="/emotions/1.png" alt="" class="sentiment" />
            </div>
            <span class="notification-message">
              Oh no! <span class="employee-name">{{ item.employee }}</span> is feeling
              <span class="emotion">"angry"</span> ({{ item.date }}). Reach out to your employees personally or by send them an
              email to see how they're doing.
            </span>
          </div>

          <!-- template: extreme emotion : amazing -------------------------------------------------------->
          <div
            v-else-if="
              item.type === 'EMPLOYEE-EXTREME_EMOTION' && item.emotion === 5
            "
            class="notification_item"
          >
            <div class="employee">
              <img src="/sample-image.png" class="avatar" />
              <img src="/emotions/5.png" class="sentiment" />
            </div>
            <span class="notification-message">
              Wow! <span class="employee-name">{{ item.employee }}</span> is feeling
              <span class="emotion">"amazing"</span> ({{ item.date }}). Reach out to your employees personally or by send them an
              email to see how they're doing.
            </span>
          </div>
        </li>
      </ul>

      <h3 class="notifications-daterange">Yesterday</h3>
      <ul class="notifications-itemlist">
        <!-- TODO: Add another <li> loop for notifications with date == to yesterday -->
      </ul>

      <h3 class="notifications-daterange">Last 7 Days</h3>
      <ul class="notifications-itemlist">
        <!-- TODO: Add another <li> loop for notifications having dates past yesterday but not past the last 7 days -->
      </ul>
    </div>
  </div>
</template>

<script>
// FIX: for test purposes
import moment from "moment";
export default {
  data() {
    return {
      // FIX: This is just a sample format
      notifications: [
        {
          _id: 1, // should be the actual document _id of user
          type: "USER-CHANGED_PASSWORD",
          date: moment().calendar(),
          reciever: "{user.firstname} {user.lastname}", // should be the actual user document
          author: null,
          employee: null,
          emotion: null
        },
        {
          _id: 2,
          type: "EMPLOYEE-EXTREME_EMOTION",
          date: moment().calendar(),
          reciever: "{user.firstname} {user.lastname}",
          author: null,
          employee: "{emp.firstname} {emp.lastname}",
          emotion: 1
        },
        {
          _id: 3,
          type: "EMPLOYEE-EXTREME_EMOTION",
          date: moment().calendar(),
          reciever: "{user.firstname} {user.lastname}",
          author: null,
          employee: "{emp.firstname} {emp.lastname}",
          emotion: 5
        },
      ]
    };
  },
  computed: {},
  methods: {},
  created() {
    // TODO: Implement data fetching. Fetch data from the database when the user visits the page
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  border: 0.5px solid #e6e6e6;
  border-radius: 10px;
  padding: 20px 0px;
  margin-top: 10px;

  .notifications-daterange {
    color: #bebebe;
    margin-bottom: 5px;
    margin-left: 40px;
  }

  .notifications-itemlist {
    // background-color: red;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    li {
      width: 100%;
    }

    .notification_item {
      // background-color: violet;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 5px 40px 0px;

      &,
      .unread {
        background-color: #ecf5ff;
      }

      .employee {
        // background-color: turquoise;
        position: relative;
        margin-right: 15px;
        align-self: flex-start;

        .avatar {
          height: 50px;
          border-radius: 999px;
        }

        .sentiment {
          height: 20px;
          position: absolute;
          bottom: 0;
          right: -5px;
        }
      }

      .notification-message {
        // font-size: 14px;
        color: #747474;

        .employee-name,
        .emotion,
        .date-time {
          font-weight: bold;
        }
      }
    }
  }
}
</style>