<?php
// Fonctions communes aux scripts du site (contact.php, chat.php). Inaccessible directement (voir .htaccess).

/**
 * Adresse IP réelle du visiteur.
 * Le site passe par le CDN de Hostinger : REMOTE_ADDR peut être l'adresse du CDN, partagée par tous les visiteurs.
 * Le CDN transmet l'adresse d'origine dans X-Forwarded-For ; on prend la dernière adresse publique de la liste
 * (celle ajoutée par le CDN lui-même, que le visiteur ne peut pas falsifier).
 */
function client_ip(): string {
  $remote = $_SERVER['REMOTE_ADDR'] ?? '';
  $fwd = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['HTTP_X_REAL_IP'] ?? '');
  if ($fwd !== '') {
    $ips = array_reverse(array_map('trim', explode(',', $fwd)));
    foreach ($ips as $ip) {
      if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) return $ip;
    }
  }
  return $remote !== '' ? $remote : 'inconnue';
}

/** Compte un passage ; renvoie true si la limite ($max sur $window secondes) est déjà atteinte. Verrou anti-concurrence. */
function hit_limit(string $name, int $max, int $window): bool {
  $file = sys_get_temp_dir() . '/axion_' . md5($name);
  $now = time();
  $fp = @fopen($file, 'c+');
  if (!$fp) return false;
  flock($fp, LOCK_EX);
  $hits = json_decode((string) stream_get_contents($fp), true);
  $hits = array_values(array_filter(is_array($hits) ? $hits : [], fn($t) => $t > $now - $window));
  $blocked = count($hits) >= $max;
  if (!$blocked) $hits[] = $now;
  ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($hits));
  flock($fp, LOCK_UN); fclose($fp);
  return $blocked;
}
