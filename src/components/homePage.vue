<template>
  <div>
    <a-divider orientation="right">
      Режим: {{mode }}
      <a-switch v-model="isPreview" @change="onChange"/>
    </a-divider>
    <div v-for="(item, index) in pageData" :key="index" class="item">
      <a-row class="item__add" v-if="!isPreview">
        <a-dropdown>
          <a-button type="primary" icon="plus"/>
          <a-menu slot="overlay" @click="handleAddClick">
            <a-menu-item key="1">Заголовок</a-menu-item>
            <a-menu-item key="2">Текст</a-menu-item>
            <a-menu-item key="3">Изображение</a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown >
          <a-button type="primary" icon="unordered-list"/>
          <a-menu slot="overlay" @click="handleAddClick">
            <a-menu-item @click="upItem(item)"><a-icon type="arrow-up"/></a-menu-item>
            <a-menu-item @click="downItem(item)"><a-icon type="arrow-down"/></a-menu-item>
            <a-menu-item @click="copyItem(item)"><a-icon type="copy"/></a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-row>
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
          <div class="btn" v-if="!isPreview">
            <a-button @click="upItem(item)" type="primary" icon="arrow-up"/>
            <a-button @click="downItem(item)" type="primary" icon="arrow-down"/>
            <a-button @click="copyItem(item)" type="primary" icon="copy" />
          </div>
        </a-col>
        <div v-if="item.type === 1">
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
            <a-input v-model="item.text" :disabled="isPreview" placeholder="Введите заголовок"/>
          </a-col>
        </div>
        <div  v-if="item.type === 2">
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
            <a-textarea v-model="item.text" :disabled="isPreview" placeholder="Введите текст" :auto-size="{ minRows: 2, maxRows: 6 }"/>
          </a-col>
        </div>
        <div v-if="item.type === 3">
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4" v-if="item.type === 3">
            <a-upload
              :disabled="isPreview"
              name="avatar"
              list-type="picture-card"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :show-upload-list="false"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div>
                  Upload
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
        </a-col>
      </a-row>
    </div>
    <div class="footer"/>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      loading: false,
      imageUrl: '',
      num: 3,
      mode: 'редактирование',
      isPreview: false
    }
  },
  methods: {
    onChange(checked) {
      this.isPreview = checked
      if (this.isPreview) {
        this.mode = 'просмотр'
      } else {
        this.mode = 'редактирование'
      }
    },
    handleAddClick (key) {
      let newEl = {
          id: ++this.num,
          type: Number(key.key)
      }
      switch (key.key) {
        case '1':
          newEl.text = ''
          break
        case '2':
          newEl.text = ''
          break
        case '3':
          newEl.imageUrl = '',
          newEl.loading = false
          break
      }
      this.pageData.push(newEl)
    },
    handleChange(file) {
      if (file.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (file.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(file.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    copyItem (item) {
      let newEl = {
        id: ++this.num,
        type: item.type
      }
      if (item.type === 3) {
        newEl.loading = false
        newEl.imageUrl = ''
      } else {
        newEl.text = item.text
      }
      this.pageData.splice(this.pageData.indexOf(item), 0, newEl)
    },
    upItem (item) {
      let index = this.pageData.indexOf(item)
      let tmpIndex = index - 1
      if (tmpIndex < 0) {
        return
      }
      console.log(this.pageData[1])
      console.log(this.pageData[0])
    },
    downItem (item) {
      let index = this.pageData.indexOf(item)
      let tmpIndex = index + 1
      if (tmpIndex === this.pageData.length) {
        return
      }
      console.log(this.pageData[1])
      console.log(this.pageData[2])
    }
  },
  computed: {
    pageData () {
      return this.$store.getters.PAGE_DATA
    }
  }
}
</script>

<style>
.item {
  margin-bottom: 20px;
}
.item__add {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.item__add button {
  margin-left: 15px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn button {
  margin-left: 30px;
}
.footer {
  width: 100%;
  height: 50px;
}
</style>