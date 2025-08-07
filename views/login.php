<?php
session_start();

// Traitement du formulaire de connexion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Identifiants par défaut (en production, utilisez une base de données)
    $valid_users = [
        'admin' => 'admin123',
        'gestionnaire' => 'gestion2024',
        'manager' => 'manager123'
    ];
    
    if (isset($valid_users[$username]) && $valid_users[$username] === $password) {
        $_SESSION['user_logged_in'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['login_time'] = time();
        
        // Redirection vers le dashboard
        header('Location: /dashboard');
        exit();
    } else {
        $error_message = "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>

<section class="flex items-center justify-center min-h-screen bg-gray-900 py-16">
  <div class="max-w-md w-full bg-gray-800 rounded-3xl p-8 border border-orange-500/20 shadow-lg shadow-orange-500/10">
      <div class="text-center mb-8">
          <div class="inline-block p-3 bg-orange-500/10 rounded-xl border border-orange-500/30 mb-4">
              <i class="fas fa-user-shield text-3xl text-orange-400"></i>
          </div>
          <h2 class="text-4xl font-bold mb-2 text-white">Connexion <span class="text-orange-400">Gestionnaire</span></h2>
          <p class="text-gray-400 text-lg">Accédez à votre tableau de bord</p>
      </div>
      
      <?php if (isset($error_message)): ?>
      <div class="mb-6 p-4 bg-red-900/30 rounded-lg border border-red-500/30">
          <p class="text-red-400 text-center"><i class="fas fa-exclamation-triangle mr-2"></i><?php echo htmlspecialchars($error_message); ?></p>
      </div>
      <?php endif; ?>
      
      <form class="space-y-6" method="POST">
          <div>
              <label for="username" class="block text-orange-400 font-semibold mb-2">Nom d'utilisateur</label>
              <input type="text" id="username" name="username" placeholder="Votre nom d'utilisateur" 
                     class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" 
                     required value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>">
          </div>
          <div>
              <label for="password" class="block text-orange-400 font-semibold mb-2">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Votre mot de passe" 
                     class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" 
                     required>
          </div>
          <button type="submit" class="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors duration-300 shadow-lg shadow-orange-500/25">
              <i class="fas fa-sign-in-alt mr-2"></i> Se Connecter
          </button>
      </form>
      
      <div class="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <p class="text-gray-400 text-sm text-center mb-2">Comptes de test :</p>
          <div class="text-xs text-gray-500 space-y-1">
              <p><strong>admin</strong> / admin123</p>
              <p><strong>gestionnaire</strong> / gestion2024</p>
              <p><strong>manager</strong> / manager123</p>
          </div>
      </div>
      
      <p class="text-center text-gray-500 text-sm mt-6">
          <a href="/" class="hover:text-orange-400 transition-colors duration-300">← Retour à l'accueil</a>
      </p>
  </div>
</section>