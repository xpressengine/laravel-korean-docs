---
layout: default
title: "암호화(Encryption)"
permalink: /docs/5.0/encryption/
---

# 암호화(Encryption)

- [소개](#introduction)
- [기본 사용법](#basic-usage)

<a name="introduction"></a>
## 소개

라라벨은 Mcrypt PHP 확장을 이용한 강력한 AES 암호화 기능을 제공합니다.

<a name="basic-usage"></a>
## 기본 사용법

#### 주어진 값 암호화하기

	$encrypted = Crypt::encrypt('secret');

> **참고:** `config/app.php` 파일의 `key` 옵션에 16,24 또는 32 자리의 임의의 문자열을 정확히 지정하십시오. 이를 설정하지 않으면 암호화된 결과값은 안전하지 않습니다.

#### 값 복호화하기

	$decrypted = Crypt::decrypt($encryptedValue);

#### 암호 & 모드 설정하기

암호화에 사용하는 방법과 모드를 지정할 수 있습니다;

	Crypt::setMode('ctr');

	Crypt::setCipher($cipher);

<div class="chak-comment-wrap"><div class="chak-comment-widget" data-apikey="coe00da03b685a0dd18fb6a08af0923de0-laravel-korean-docs-암호화(Encryption)-기본 사용법" ><i class="xi-message"></i> <strong>클릭</strong>하여 의견을 공유할 수 있습니다. ( 총 <span class="count"><i class="xi-spinner-5 xi-spin"></i></span>개의 의견이 있습니다. )</div></div>
