export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
      this._name = document.querySelector(nameSelector);
      this._job = document.querySelector(jobSelector);
      this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
      return {
          name: this._name.textContent,
          job: this._job.textContent,
          id: this._userId,
      };
  }

  setUserInfo(data) {
      this._name.textContent = data.name;
      this._job.textContent = data.job;
      this._userId = data.userId;
  }

  setUserAvatar(profileAvatar) {
      this._avatar.src = profileAvatar;
  }
}
