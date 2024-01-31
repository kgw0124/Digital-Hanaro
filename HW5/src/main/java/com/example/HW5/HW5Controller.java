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
	/**
	@PostMapping("/payment")
	public HashMap<String, Object> getPayment(HttpServletRequest request, @RequestParam("per_pay") int per_pay, @RequestParam("work_time") int work_time){ //HttpServletRequest 객체에 매개변수를 담아온다. -> 매개변수 자료형에 맞춰서 자동적으로 자료형 변환을 해준다.
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("result", per_pay*work_time);
		return map;
	}
	**/
	
	/** 
	 * 강사님 코드 
	 * // @RequestBody : FE와 JSON으로 데이터를 주고 받는 경우 
	 * 	-> url을 통해 데이터를 주고 받는 GET은 PathVariable을 주로 사용
	 *  -> 또는 axios를 통해서 JSON 형식으로 데이터를 보낼 수도 있다. : 사용률 낮음
	**/
	@PostMapping("/payment")
	public HashMap<String, Object> getPayment(@RequestBody HashMap<String, String> param){ // @RequestBody : FE와 JSON으로 데이터를 주고 받는 경우 -> url을 통해 데이터를 주고 받는 GET은 PathVariable을 주로 사용 또는 axios를 통해서 JSON 형식으로 데이터를 보낼 수도 있다.
		String name = param.get("name");
		int per_pay = Integer.parseInt(param.get("per_pay"));
		int work_time = Integer.parseInt(param.get("work_time"));
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("result", "OK");
		map.put("msg", String.format("%s 님의 주급은 %d입니다.", name, per_pay*work_time));
		System.out.println(per_pay*work_time);
		return map;
	}
}