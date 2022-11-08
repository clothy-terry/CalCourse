﻿# 后端 API 接口说明

AWS API 接口：https://j2xnmuiw4k.execute-api.us-west-1.amazonaws.com/CalCourse

## 数据类型

### Course

course_name: str # Primary key
course_term: str # Secondary key
course_id: int
course_qr_code_url: str

### MissingRecord

course_name: str # Primary key
course_term: str # Secondary key
total_count: int

## API 路径

1. 测试用 Home Page:
   路径: **"/"**
   指令类型: GET
   参数: 无
   返回结果: Hello World
   
2. 获取所有的 Courses
   路径: **"/courses/get_all_courses/{email}/{access_token}"**
   指令类型: GET
   参数: {email: str, access_token: str}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; -若 access token 匹配 则返回所有的 Course 数据
   &nbsp;&nbsp;&nbsp;&nbsp; -若不匹配 触发 401 Error Code

3. 上传一个新的 Course
   路径: **"/courses/upload_course"**
   指令类型: POST
   参数: {course_obj: **Course**}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; {"message": f"Course {course_obj.course_name} uploaded successfully"}

4. 更新现有的 Course
   路径: **"/courses/update_course"**
   指令类型: PUT
   参数: {course_obj: **Course**}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; {"message": f"Course {course_obj.course_name} updated"}

5. 删除一个 Course
   路径: **"/courses/delete_course/{course_term}/{course_name}"**
   指令类型: DELETE
   参数: {course_name: str, course_term: str}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; {"message": f"Course {course_name} deleted"}

6. 核实 Google Email Address
   路径: **"/email/verify_google_email/{email_address}/{verified_status}/{user_name}"**
   指令类型: POST
   参数: {email_address: str, verified_status: str, user_name: str}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; -若认证成功 返回 {"message": f"Email {email_address} verified successfully.", "access_token": access_token}
   &nbsp;&nbsp;&nbsp;&nbsp; -若认证失败 触发 400 Error Code

7. 给邮箱发送验证码
   路径: **"/email/send_verification_code/{email_address}"**
   指令类型: POST
   参数: {email_address: str}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; {"message": f"Verification code sent to {email_address}"}

8. 核实验证码
   路径: **"/email/verify_authentication_code/{email_address}/{authentication_code}"**
   指令类型: POST
   参数: {email_address: str, authentication_code: str}
   返回结果:
   &nbsp;&nbsp;&nbsp;&nbsp; -若邮件地址为管理员邮箱 返回 {"message": f"Admin email {email_address} detected. Welcome.", "access_token": access_token}
   &nbsp;&nbsp;&nbsp;&nbsp; -若邮件地址以及验证码与数据库里对应成功 返回 {"message": f"Authentication code verified for {email_address}.", "access_token": access_token}
   &nbsp;&nbsp;&nbsp;&nbsp; -若对应失败 触发 400 Error Code

9. 申请建群/Report Missing Class
   路径: **"/courses/report_missing_class"**
   指令类型: POST
   参数: {report_obj: **MissingRecord**}
   返回结果: {"message": f"Course missing report for {term} {course_full_name} has been recorded. Now count is {count}."}
