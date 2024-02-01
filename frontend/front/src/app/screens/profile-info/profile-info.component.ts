import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ProfileInfoService } from "./services/profile-info.service";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
})
export class ProfileInfoComponent implements OnInit {
  visibilityNew: boolean = false;
  visibilityCurrent: boolean = false;
  password: string = "password";

  formProfile!: FormGroup;

  formPassword!: FormGroup;

  loading: boolean = false;
  hasError: string = "";

  selectedImage: string | undefined;

  formDataProfile = new FormData();
  formDataPassword = new FormData();

  user: any;

  constructor(private formBuilder: NonNullableFormBuilder, private profileInfoService: ProfileInfoService) {
    this.user = JSON.parse(sessionStorage.getItem("userInfo") || "");
  }

  ngOnInit() {
    this.formProfile = this.formBuilder.group({
      name: [this.user.name? this.user.name : "" , [Validators.required]],
      lastName: [this.user.lastName? this.user.lastName: "", [Validators.required]],
      email: [this.user.email? this.user.email : "", [Validators.required, Validators.email]],
      country: [this.user.country? this.user.country: ""],
    });
    this.formPassword = this.formBuilder.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
    });
  }

  formErrorMessage(fieldName: string) {
    const field = this.formProfile.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    if (field?.hasError("email")) {
      return "Endereço de email inválido";
    }
    return;
  }

  formErrorMessagePassword(fieldName: string) {
    const field = this.formPassword.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo é necessário";
    }
    return;
  }

  triggerFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (this.formDataProfile.has("imgUrl")) {
        this.formDataProfile.delete("imgUrl");
      }

      this.formDataProfile.append("imgUrl", selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  onClick(iten: string) {
    if (iten == "new") {
      this.visibilityNew = !this.visibilityNew;
      if (this.password === "text") {
        this.password = "password";
      } else if (this.password === "password") {
        this.password = "text";
      }
    } else {
      this.visibilityCurrent = !this.visibilityCurrent;
      if (this.password === "text") {
        this.password = "password";
      } else if (this.password === "password") {
        this.password = "text";
      }
    }
  }

  updateProfile() {
    const id = this.user.id;
    this.formDataProfile.append("name",this.formProfile.value.name);
    this.formDataProfile.append("lastName",this.formProfile.value.lastName);
    this.formDataProfile.append("email",this.formProfile.value.email);
    this.formDataProfile.append("country",this.formProfile.value.country);
    this.profileInfoService.updateProfileService(id,this.formDataProfile).subscribe({
      next: (data) => console.log(data)
    });
  }

  updatePassword(){
    const id = this.user.id;
    this.formDataPassword.append("currentPassword",this.formPassword.value.currentPassword);
    this.formDataPassword.append("newPassword", this.formPassword.value.newPassword);
    this.profileInfoService.updatePasswordService(id, this.formDataPassword).subscribe({
      next: (data) => console.log(data)
    });
  }
}
