package com.example.HW5;

import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

//CrossOrigin : CORS policy 오류 해결 
//RestController : java 객체를 json 형태로 바꿔준다.
//RequestMapping(value="/hello") : /hello/~ 의 경로를 HelloController가 처리한다.

@CrossOrigin("*")
@RestController
public class HW5Controller{
	@PostMapping("/payment")
	public HashMap<String, Object> getPayment(HttpServletRequest request, @RequestParam("per_pay") int per_pay, @RequestParam("work_time") int work_time){ //HttpServletRequest 객체에 매개변수를 담아온다. -> 매개변수 자료형에 맞춰서 자동적으로 자료형 변환을 해준다.
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("result", per_pay*work_time);
		return map;
	}
}